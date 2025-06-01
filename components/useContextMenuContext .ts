import { createContext, useContext } from 'react';
export const useContextMenuContext = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('ContextMenuContext is not available');
  return ctx;
};
