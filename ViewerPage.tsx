import { useRef } from 'react';

import { ContextMenu } from './components/ContextMenu';
import { ContextMenuProvider } from './context/ContextMenuContext';
import { ViewerProvider } from './context/viewer-context';
import { ViewerContent } from './ViewerContent';

export default function ViewerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ViewerProvider>
      <ContextMenuProvider>
        <ViewerContent canvasRef={canvasRef} />
        <ContextMenu />
      </ContextMenuProvider>
    </ViewerProvider>
  );
}
