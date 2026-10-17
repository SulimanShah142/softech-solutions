
'use client';

import { useState } from 'react';
import { ArrowUpRight, CalendarDays, Phone, Video, X } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import type { SiteLanguage } from '@/lib/site-language';

const events = {
  online: {
    url: 'slliman-sarwary-htumgn/online-consultation',
    title: {
      en: 'Online consultation',
      'fa-AF': 'مشاوره آنلاین',
      ps: 'آنلاین مشوره',
    },
    description: {
      en: 'Meet with us online for 30 minutes.',
      'fa-AF': 'برای ۳۰ دقیقه به‌صورت آنلاین با ما گفتگو کنید.',
      ps: 'د ۳۰ دقیقو لپاره له موږ سره آنلاین خبرې وکړئ.',
    },
  },
  phone: {
    url: 'slliman-sarwary-htumgn/phone-consultation',
    title: {
      en: 'Phone consultation',
      'fa-AF': 'مشاوره تلفنی',
      ps: 'د ټیلیفون مشوره',
    },
    description: {
      en: 'Arrange a 30-minute phone consultation.',
      'fa-AF': 'یک مشاوره تلفنی ۳۰ دقیقه‌ای تنظیم کنید.',
      ps: 'د ۳۰ دقیقو ټیلیفوني مشورې وخت وټاکئ.',
    },
  },
} as const;

const copy = {
  en: {
    eyebrow: 'BOOK A MEETING',
    heading: 'Prefer to schedule a call?',
    description: 'Choose how you would like to meet with our team.',
    online: 'Online meeting',
    phone: 'Phone call',
    close: 'Close booking dialog',
    fallback: 'Open booking page',
    loading: 'Loading booking calendar…',
  },
  'fa-AF': {
    eyebrow: 'رزرو جلسه',
    heading: 'می‌خواهید جلسه تنظیم کنید؟',
    description: 'روش گفتگو با تیم ما را انتخاب کنید.',
    online: 'جلسه آنلاین',
    phone: 'تماس تلفنی',
    close: 'بستن پنجره رزرو',
    fallback: 'باز کردن صفحه رزرو',
    loading: 'تقویم رزرو در حال بارگذاری است…',
  },
  ps: {
    eyebrow: 'د غونډې وخت',
    heading: 'غواړئ د خبرو وخت وټاکئ؟',
    description: 'له زموږ له ډلې سره د خبرو ډول وټاکئ.',
    online: 'آنلاین غونډه',
    phone: 'ټیلیفوني اړیکه',
    close: 'د وخت ټاکلو کړکۍ بنده کړئ',
    fallback: 'د وخت ټاکلو پاڼه پرانیزئ',
    loading: 'د وختونو کلیزه پرانیستل کېږي…',
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

type EventKey = keyof typeof events;

export default function ConsultationBooking({
  language,
}: {
  language: SiteLanguage;
}) {
  const [selected, setSelected] = useState<EventKey | null>(null);
  const [embedError, setEmbedError] = useState(false);
  const t = copy[language];
  const rtl = language !== 'en';
  const event = selected ? events[selected] : null;

  async function openBooking(key: EventKey) {
    setSelected(key);
    setEmbedError(false);

    try {
      const cal = await getCalApi({ namespace: key });

      cal('ui', {
        theme: 'dark',
        styles: {
          branding: {
            brandColor: '#28D9A0',
          },
        },
      });

      cal('modal', {
        calLink: events[key].url,
      });
    } catch {
      setEmbedError(true);
    }
  }

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="mt-8">
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#28D9A0]">
          {t.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {t.heading}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {t.description}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(['online', 'phone'] as const).map((key) => {
          const item = events[key];
          const Icon = key === 'online' ? Video : Phone;

          return (
            <button
              key={key}
              type="button"
              onClick={() => void openBooking(key)}
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-start transition hover:border-[#28D9A0]/40 hover:bg-[#28D9A0]/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#28D9A0]/20 bg-[#28D9A0]/[0.08] text-[#28D9A0]">
                <Icon size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">
                  {key === 'online' ? t.online : t.phone}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">
                  {item.description[language]}
                </span>
              </span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="shrink-0 text-slate-500 transition group-hover:text-[#28D9A0]"
              />
            </button>
          );
        })}
      </div>

      {selected && event && (
        <div
          className="mt-3 rounded-xl border border-white/10 bg-[#080D19] p-4"
          role="status"
        >
          <div className="flex items-center gap-2 text-sm text-white">
            <CalendarDays size={16} className="text-[#28D9A0]" />
            <span>{event.title[language]}</span>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t.close}
              className="ms-auto rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              <X size={16} />
            </button>
          </div>

          {embedError && (
            <a
              href={`https://cal.com/${event.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#28D9A0] underline underline-offset-4"
            >
              {t.fallback}
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
