'use client';

import { useEffect } from 'react';

import { useContextMenuContext } from '../context/ContextMenuContext';
import Properties from './properties';

export function ContextMenu() {
  const { contextMenu, selectedMeta, setSelectedMeta } = useContextMenuContext();

  // Apply custom styles to the XeoKit ContextMenu
  useEffect(() => {
    if (!contextMenu) return;

    // Add any custom styling or event handlers if needed
    // The XeoKit ContextMenu creates its own DOM elements

    return () => {
      // Clean up if necessary - this should be a function, not JSX
    };
  }, [contextMenu]);

  // Return the Properties component when selectedMeta exists
  return (
    <>
      {selectedMeta && (
        <div className='absolute z-50 top-0 right-0 w-96 '>
          <Properties metaObj={selectedMeta} onClose={() => setSelectedMeta(null)} />
        </div>
      )}
    </>
  );
}
