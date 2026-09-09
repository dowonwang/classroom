import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { serverSessionQueryOptions } from '$entities/session/server';
import { Footer } from '$widgets/footer';
import { PrivateHeader } from '$widgets/private-header';
import { Sidebar, SidebarProvider } from '$widgets/sidebar';

interface Props {
  children: React.ReactNode;
}

export async function PrivateLayout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(serverSessionQueryOptions);

  return (
    <div id='root' className='relative flex min-h-dvh'>
      <SidebarProvider>
        <Sidebar />
        <div className='flex min-w-0 flex-1 flex-col'>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PrivateHeader />
          </HydrationBoundary>
          <main className='flex-1 p-4 md:p-6 lg:p-8'>{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
