'use client';

import { createContext, useContext, useState } from 'react';

interface Context {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
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
        setIsOpen,
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
