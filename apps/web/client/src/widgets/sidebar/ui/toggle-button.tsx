'use client';

import { Button } from '@packages/ui/components/button';
import { Menu } from 'lucide-react';

import { useSidebarContext } from '../model/context';

interface Props {
  className?: string;
}

export function SidebarToggleButton({ className }: Props) {
  const { toggle } = useSidebarContext();

  return (
    <Button size='icon' onClick={toggle} className={className ?? ''}>
      <Menu />
    </Button>
  );
}
