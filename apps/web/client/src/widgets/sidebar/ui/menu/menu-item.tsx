'use client';

import { cn } from '@packages/ui/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useSidebarContext } from '$widgets/sidebar/model/context';

import type { MenuData } from '../../model/menu';

export function MenuItem({ href, title }: MenuData) {
  const pathname = usePathname();
  const { setIsOpen } = useSidebarContext();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Link
      href={href}
      className={cn('block rounded-xl p-3', {
        'bg-primary/20 ring-primary/50 font-semibold ring': pathname === href,
        'hover:bg-secondary ring-border hover:ring': pathname !== href,
      })}
    >
      {title}
    </Link>
  );
}
