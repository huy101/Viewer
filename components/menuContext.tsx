import { createContext, ReactNode, useContext } from 'react';

import { useContextMenu } from '../hooks/use-context-menu';

// Create context with null as initial value
const ContextMenuContext = createContext<ReturnType<typeof useContextMenu> | null>(null);

// Provider component that will wrap the app and provide context
export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
  // We don't pass viewer here - we'll get it from ViewerContext in the hook
  const contextMenu = useContextMenu();

  return <ContextMenuContext.Provider value={contextMenu}>{children}</ContextMenuContext.Provider>;
};
