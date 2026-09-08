'use client';

import { AppLogo, AppName } from '$shared/ui';

import { MENU_DATA } from '../config/menu-data';
import { Menu } from './menu/menu';

export function Sidebar() {
  return (
    <aside className='bg-sidebar border-border w-active-sidebar hidden h-dvh flex-col border-r md:flex'>
      <div className='border-border min-h-header h-header flex items-center gap-3 border-b px-5'>
        <AppLogo height={36} width={36} />
        <AppName />
      </div>

      <Menu data={MENU_DATA} />
    </aside>
  );
}
