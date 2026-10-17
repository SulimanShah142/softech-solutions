
import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const EVENT_TYPES = new Set([
  "BOOKING_CREATED",
  "BOOKING_RESCHEDULED",
  "BOOKING_CANCELLED",
]);

const DEDUP_TTL_SECONDS = 60 * 60 * 24 * 30;
const LOCK_TTL_SECONDS = 120;

type CalPerson = {
  name?: string;
  email?: string;
  timeZone?: string;
};

type CalPayload = {
  uid?: string;
  bookingUid?: string;
  bookingId?: string | number;
  title?: string;
  type?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  cancellationReason?: string;
  reschedulingReason?: string;
  attendees?: CalPerson[];
  organizer?: CalPerson;
  responses?: {
    name?: string;
    email?: string;
  };
};

type CalWebhook = {
  triggerEvent?: string;
  createdAt?: string;
  payload?: CalPayload;
};

type RedisResponse = {
  result?: unknown;
  error?: string;
};

function json(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function validEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    value.length <= 254
  );
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatDate(value: unknown, timeZone?: string): string {
  if (typeof value !== "string") return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not provided";

  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
      ...(timeZone ? { timeZone } : { timeZone: "UTC" }),
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

function verifySignature(
  rawBody: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;

  const received = signature.replace(/^sha256=/i, "").trim();

  if (!/^[a-f0-9]{64}$/i.test(received)) return false;

  const expected = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest();

  const supplied = Buffer.from(received, "hex");

  return (
    supplied.length === expected.length &&
    timingSafeEqual(supplied, expected)
  );
}

async function redisCommand(
  command: Array<string | number>,
): Promise<unknown> {
  const url = requiredEnv("UPSTASH_REDIS_REST_URL").replace(/\/+$/, "");
  const token = requiredEnv("UPSTASH_REDIS_REST_TOKEN");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Redis request failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as RedisResponse;

  if (data.error) {
    throw new Error("Redis returned a command error");
  }

  return data.result;
}

async function redisGet(key: string): Promise<string | null> {
  const result = await redisCommand(["GET", key]);

  return typeof result === "string" ? result : null;
}

async function releaseLock(key: string, token: string): Promise<void> {
  const script =
    'if redis.call("GET", KEYS[1]) == ARGV[1] then ' +
    'return redis.call("DEL", KEYS[1]) else return 0 end';

  await redisCommand(["EVAL", script, 1, key, token]);
}

function getTransport() {
  const port = Number(requiredEnv("SMTP_PORT"));

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT is invalid");
  }

  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

function buildEmail(
  eventType: string,
  booking: CalPayload,
  attendee: CalPerson,
) {
  const labels: Record<string, string> = {
    BOOKING_CREATED: "Consultation booked",
    BOOKING_RESCHEDULED: "Consultation rescheduled",
    BOOKING_CANCELLED: "Consultation cancelled",
  };

  const title = booking.title || booking.type || "SofTech consultation";
  const timeZone = attendee.timeZone || booking.organizer?.timeZone;
  const start = formatDate(booking.startTime, timeZone);
  const end = formatDate(booking.endTime, timeZone);

  const reason =
    eventType === "BOOKING_CANCELLED"
      ? booking.cancellationReason
      : eventType === "BOOKING_RESCHEDULED"
        ? booking.reschedulingReason
        : undefined;

  const details = [
    ["Consultation", title],
    ["Attendee", attendee.name || "Not provided"],
    ["Email", attendee.email || "Not provided"],
    ["Start", start],
    ["End", end],
    ...(booking.location ? [["Location", booking.location] as string[]] : []),
    ...(reason ? [["Reason", reason] as string[]] : []),
  ];

  const rows = details
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;color:#64748b">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;color:#0f172a">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const subject = `SofTech | ${labels[eventType]}: ${title}`;

  const textBody = [
    labels[eventType],
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
      <h2 style="color:#059669">${escapeHtml(labels[eventType])}</h2>
      <p>Booking details for your SofTech consultation:</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows}
      </table>
      <p style="margin-top:24px;color:#64748b">
        SofTech Solutions
      </p>
    </div>
  `;

  return { subject, textBody, htmlBody };
}

export async function POST(request: NextRequest) {
  let lockKey: string | undefined;
  let lockToken: string | undefined;

  try {
    const secret = requiredEnv("CAL_WEBHOOK_SECRET");
    const rawBody = await request.text();

    if (
      !verifySignature(
        rawBody,
        request.headers.get("x-cal-signature-256"),
        secret,
      )
    ) {
      return json("Invalid webhook signature", 401);
    }

    let event: CalWebhook;

    try {
      event = JSON.parse(rawBody) as CalWebhook;
    } catch {
      return json("Invalid JSON payload", 400);
    }

    if (!event || typeof event !== "object" || !event.payload) {
      return json("Missing booking payload", 400);
    }

    const eventType = event.triggerEvent;

    // Ignore validly signed webhook events we did not subscribe to handle.
    if (!eventType || !EVENT_TYPES.has(eventType)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const booking = event.payload;

    const attendee =
      booking.attendees?.find((person) => validEmail(person.email)) ??
      (validEmail(booking.responses?.email)
        ? {
            name: booking.responses?.name,
            email: booking.responses.email,
          }
        : undefined);

    const attendeeEmail = attendee?.email;

    if (!attendee || !attendeeEmail) {
      // Do not retry forever for a signed event without a usable attendee.
      console.error("Cal webhook has no valid attendee email", {
        eventType,
      });

      return json("Booking has no valid attendee email", 422);
    }

    const ownerEmail = requiredEnv("CONTACT_TO");

    if (!validEmail(ownerEmail)) {
      throw new Error("CONTACT_TO is not a valid email address");
    }

    const bookingId =
      booking.uid ?? booking.bookingUid ?? booking.bookingId;

    if (bookingId === undefined || bookingId === null) {
      return json("Booking identifier is missing", 422);
    }

    // Prefer Cal.com's stable event timestamp. Use booking details as a
    // fallback if a timestamp is absent.
    const identity = [
      eventType,
      String(bookingId),
      event.createdAt || "",
      booking.startTime || "",
      booking.endTime || "",
      attendeeEmail.toLowerCase(),
    ].join("|");

    const eventId = createHash("sha256")
      .update(identity)
      .digest("hex");

    const prefix = `softech:cal:${eventId}`;
    const completedKey = `${prefix}:completed`;

    if (await redisGet(completedKey)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    lockKey = `${prefix}:lock`;
    lockToken = randomUUID();

    const claim = await redisCommand([
      "SET",
      lockKey,
      lockToken,
      "NX",
      "EX",
      LOCK_TTL_SECONDS,
    ]);

    if (claim !== "OK") {
      // Ask Cal.com to retry rather than falsely acknowledging work that
      // another invocation may still be processing.
      return json("Event is currently being processed; retry later", 503);
    }

    const mailer = getTransport();
    const email = buildEmail(eventType, booking, attendee);

    const recipients = [
      { email: attendeeEmail, kind: "attendee" },
      { email: ownerEmail, kind: "owner" },
    ].filter(
      (recipient, index, all) =>
        all.findIndex(
          (other) =>
            other.email.toLowerCase() === recipient.email.toLowerCase(),
        ) === index,
    );

    for (const recipient of recipients) {
      const recipientHash = createHash("sha256")
        .update(recipient.email.toLowerCase())
        .digest("hex");

      const sentKey = `${prefix}:recipient:${recipientHash}`;

      // Skip recipients already recorded as sent on an earlier attempt.
      if (await redisGet(sentKey)) continue;

      await mailer.sendMail({
        from: requiredEnv("SMTP_USER"),
        to: recipient.email,
        subject: email.subject,
        text:
          recipient.kind === "attendee"
            ? `Hello ${attendee.name || "there"},\n\n${email.textBody}\n\nSofTech Solutions`
            : `A Cal.com booking event occurred.\n\n${email.textBody}`,
        html:
          recipient.kind === "attendee"
            ? `<p>Hello ${escapeHtml(attendee.name || "there")},</p>${email.htmlBody}`
            : `<p>A Cal.com booking event occurred.</p>${email.htmlBody}`,
      });

      // Record each recipient separately, so a later failure can retry
      // the unsent recipient without intentionally resending the first.
      await redisCommand([
        "SET",
        sentKey,
        "sent",
        "EX",
        DEDUP_TTL_SECONDS,
      ]);
    }

    await redisCommand([
      "SET",
      completedKey,
      "sent",
      "EX",
      DEDUP_TTL_SECONDS,
    ]);

    return NextResponse.json({ received: true, processed: true });
  } catch (error) {
    // Avoid logging secrets, full payloads, or attendee personal details.
    console.error("Cal webhook processing failed:", {
      error:
        error instanceof Error ? error.message : "Unknown processing error",
    });

    return json("Webhook processing failed", 500);
  } finally {
    if (lockKey && lockToken) {
      try {
        await releaseLock(lockKey, lockToken);
      } catch {
        // The lock expires automatically if Redis is temporarily unavailable.
      }
    }
  }
}
