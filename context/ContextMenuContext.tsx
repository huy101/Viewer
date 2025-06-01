'use client';

import { createContext, type ReactNode, useContext } from 'react';

import { useContextMenu } from '../hooks/use-context-menu';

const ContextMenuContext = createContext<ReturnType<typeof useContextMenu> | null>(null);

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
  const contextMenu = useContextMenu();

  return <ContextMenuContext.Provider value={contextMenu}>{children}</ContextMenuContext.Provider>;
};

export const useContextMenuContext = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('ContextMenuContext is not available');
  return ctx;
};
