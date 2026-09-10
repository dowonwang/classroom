import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { setRequestLocale } from 'next-intl/server';

import { LOCALES } from '$app/i18n';
import { serverSessionQueryOptions } from '$entities/session/server';
import { Footer } from '$widgets/footer';
import { PublicHeader } from '$widgets/public-header';

import type { Locale } from '$app/i18n';

interface Props {
  children: React.ReactNode;
  locale: string;
}

export async function PublicLayout({ children, locale }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(serverSessionQueryOptions);

  if (LOCALES.includes(locale as Locale)) {
    setRequestLocale(locale);
  }

  return (
    <div id='root' className='flex min-h-dvh flex-col'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PublicHeader />
      </HydrationBoundary>
      <main className='container mx-auto flex flex-1 flex-col p-6'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
