import '@packages/ui/styles.css';

import '$app/styles/global.css';

import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import {
  FlashCookieConsumer,
  QueryClientProvider,
  ThemeProvider,
} from '$app/providers';
import { getFlashCookie } from '$shared/lib/cookie/server';
import { initializeTheme } from '$shared/lib/theme';
import { getTheme } from '$shared/lib/theme/get-theme.server';

interface Props {
  children: React.ReactNode;
}
const notoKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
});

const noto = Noto_Sans({
  variable: '--font-noto-sans',
});

export async function AppLayout({ children }: Props) {
  const flashToken = await getFlashCookie();
  const theme = await getTheme();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${notoKr.variable} ${noto.variable} ${theme === 'dark' ? 'dark' : ''}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initializeTheme.toString()})()`,
          }}
        />
      </head>

      <body className='bg-background'>
        <FlashCookieConsumer shouldConsume={!!flashToken} />

        <QueryClientProvider>
          <NextIntlClientProvider>
            <ThemeProvider initTheme={theme}>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
