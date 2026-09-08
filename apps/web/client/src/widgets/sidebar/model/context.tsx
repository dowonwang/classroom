'use client';

import { createContext, useContext, useState } from 'react';

interface Context {
  isOpen: boolean;
  toggle: () => void;
}

interface Props {
  children: React.ReactNode;
}

const SidebarContext = createContext<Context | null>(null);

export function SidebarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext
      value={{
        isOpen,
        toggle,
      }}
    >
      {children}
    </SidebarContext>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }

  return context;
}
