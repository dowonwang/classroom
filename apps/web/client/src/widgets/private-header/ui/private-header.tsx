'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { sessionQueryOptions } from '$entities/session';
import { UserAvatar } from '$entities/user';
import { SignOutButton } from '$features/auth/sign-out';
import { SidebarToggleButton } from '$widgets/sidebar/ui/toggle-button';

export function PrivateHeader() {
  const today = dayjs().format('dddd, MMM D');
  const { data } = useQuery(sessionQueryOptions);

  if (!data?.authenticated) {
    return null;
  }

  return (
    <header className='bg-header/80 border-border h-header sticky top-0 flex items-center gap-4 border-b px-6 backdrop-blur-md'>
      <div className='hidden md:block'>
        <span className='text-secondary-foreground'>{today}</span>
      </div>

      <SidebarToggleButton className='md:hidden' type='OPEN' />

      <div className='ml-auto flex items-center gap-2'>
        <SignOutButton />
        <UserAvatar name={data.user.name} />
      </div>
    </header>
  );
}
