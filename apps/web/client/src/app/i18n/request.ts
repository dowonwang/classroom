import { cookies } from 'next/headers';
import { hasLocale, type AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

type MessageModule = {
  default: AbstractIntlMessages;
};

const loadMessages = {
  ko: async () => {
    const mod: MessageModule = await import('@packages/i18n/lang/ko');
    return mod.default;
  },
  en: async () => {
    const mod: MessageModule = await import('@packages/i18n/lang/en');
    return mod.default;
  },
} satisfies Record<Locale, () => Promise<AbstractIntlMessages>>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  let locale: Locale;

  if (requestedLocale) {
    if (!hasLocale(routing.locales, requestedLocale)) {
      locale = routing.defaultLocale;
    } else {
      locale = requestedLocale;
    }
  } else {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

    locale = hasLocale(routing.locales, cookieLocale)
      ? cookieLocale
      : routing.defaultLocale;
  }

  return {
    locale,
    messages: await loadMessages[locale](),
  };
});
