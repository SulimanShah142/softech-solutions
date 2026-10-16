
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NextResponse } from 'next/server';

const ROUTE = '[Contact API]';

const allowedProjectTypes = new Set([
  'Website development',
  'Mobile application',
  'AI & automation',
  'Custom software',
  'UI/UX design',
  'Other',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_KEYS = 2000;

function log(stage: string, details?: unknown) {
  console.log(
    `${ROUTE} ${new Date().toISOString()} ${stage}`,
    details ?? '',
  );
}

function logError(stage: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`${ROUTE} ${stage}`, {
      name: error.name,
      message: error.message,
      // SMTP errors may include useful response codes.
      code: 'code' in error ? error.code : undefined,
      command: 'command' in error ? error.command : undefined,
      responseCode:
        'responseCode' in error ? error.responseCode : undefined,
      response:
        'response' in error ? error.response : undefined,
    });
  } else {
    console.error(`${ROUTE} ${stage}`, error);
  }
}

function isRateLimited(key: string, now: number) {
  if (submissions.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, timestamps] of submissions) {
      const recent = timestamps.filter(
        (time) => now - time < WINDOW_MS,
      );

      if (recent.length) submissions.set(storedKey, recent);
      else submissions.delete(storedKey);
    }
  }

  const recent = (submissions.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);
  return false;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function respond(
  status: number,
  body: { ok: boolean; error?: string },
) {
  log('HTTP response', { status, ok: body.ok });

  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = crypto.randomUUID();

  const trace = (stage: string, details?: unknown) =>
    log(`[${requestId}] ${stage}`, details);

  trace('Request received', {
    method: request.method,
    contentType: request.headers.get('content-type'),
    contentLength: request.headers.get('content-length'),
  });

  try {
    const contentType = request.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      trace('Rejected: unsupported content type');
      return respond(415, {
        ok: false,
        error: 'Invalid request format.',
      });
    }

    const declaredLength = Number(
      request.headers.get('content-length') ?? 0,
    );

    if (declaredLength > 20_000) {
      trace('Rejected: request too large', { declaredLength });
      return respond(413, {
        ok: false,
        error: 'Your submission is too large.',
      });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      trace('Rejected: malformed JSON');
      return respond(400, {
        ok: false,
        error: 'Invalid request body.',
      });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      trace('Rejected: body is not an object');
      return respond(400, {
        ok: false,
        error: 'Invalid form submission.',
      });
    }

    const data = body as Record<string, unknown>;

    // Do not send email for automated submissions.
    if (typeof data.website === 'string' && data.website.trim()) {
      trace('Honeypot triggered; email intentionally not sent');
      return respond(200, { ok: true });
    }

    const name = cleanText(data.name, 100);
    const email = cleanText(data.email, 254).toLowerCase();
    const projectType = cleanText(data.projectType, 60);
    const message = cleanText(data.message, 5000);

    trace('Form parsed', {
      namePresent: Boolean(name),
      emailPresent: Boolean(email),
      emailFormatValid: emailPattern.test(email),
      projectType,
      messageLength: message.length,
    });

    if (
      name.length < 2 ||
      !emailPattern.test(email) ||
      !allowedProjectTypes.has(projectType) ||
      message.length < 10
    ) {
      trace('Rejected: validation failed');
      return respond(400, {
        ok: false,
        error: 'Please check your details and try again.',
      });
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientKey =
      forwardedFor?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(clientKey, Date.now())) {
      trace('Rejected: rate limit reached');
      return respond(429, {
        ok: false,
        error: 'Too many submissions. Please try again in 15 minutes.',
      });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_TO;

    trace('Checking SMTP configuration', {
      hostPresent: Boolean(host),
      port,
      userPresent: Boolean(user),
      passwordPresent: Boolean(pass),
      recipientPresent: Boolean(recipient),
      passwordLength: pass?.length ?? 0,
    });

    if (
      !host ||
      !user ||
      !pass ||
      !recipient ||
      !Number.isFinite(port) ||
      ![465, 587].includes(port)
    ) {
      trace('Failed: incomplete SMTP configuration');

      return respond(500, {
        ok: false,
        error: 'Email delivery is temporarily unavailable.',
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    trace('Verifying SMTP connection', { host, port });

    try {
      await transporter.verify();
      trace('SMTP verification succeeded');
    } catch (error) {
      logError(`[${requestId}] SMTP verification failed`, error);

      return respond(502, {
        ok: false,
        error: 'Could not connect to the email service.',
      });
    }

    trace('Submitting email to SMTP server', {
      sender: user,
      recipient,
      subject: `New website inquiry: ${projectType}`,
    });

    let info: SMTPTransport.SentMessageInfo;

    try {
      info = await transporter.sendMail({
        from: {
          name: 'SofTech Solutions Website',
          address: user,
        },
        to: recipient,
        replyTo: email,
        subject: `New website inquiry: ${projectType}`,
        text: [
          'New project inquiry from the SofTech Solutions website',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Project type: ${projectType}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      });
    } catch (error) {
      logError(`[${requestId}] SMTP sendMail failed`, error);

      return respond(502, {
        ok: false,
        error: 'The email server failed to send your message.',
      });
    }

    const accepted = info.accepted.map(String);
    const rejected = info.rejected.map(String);

    trace('SMTP sendMail completed', {
      messageId: info.messageId,
      accepted,
      rejected,
      response: info.response,
      envelope: {
        from: info.envelope.from,
        to: info.envelope.to,
      },
      durationMs: Date.now() - startedAt,
    });

    const recipientAccepted = accepted.some(
      (address) =>
        address.toLowerCase() === recipient.toLowerCase(),
    );

    if (!recipientAccepted) {
      trace('Failed: configured recipient not accepted');

      return respond(502, {
        ok: false,
        error: 'The email server did not accept the recipient.',
      });
    }

    trace('SMTP accepted recipient; inbox delivery not yet confirmed', {
      messageId: info.messageId,
      durationMs: Date.now() - startedAt,
    });

    return respond(200, { ok: true });
  } catch (error) {
    logError(`[${requestId}] Unexpected route error`, error);

    return respond(500, {
      ok: false,
      error: 'An unexpected error occurred while sending your message.',
    });
  }
}
