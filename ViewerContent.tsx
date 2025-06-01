'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { ContextMenu } from './components/ContextMenu';
import { LoadingIndicator } from './components/loading-indicator';
import Properties from './components/properties';
import SectionModal from './components/SectionModal';
import ViewerToolbar from './components/Toolbar';
import { useContextMenu } from './hooks/use-context-menu';
import { useModelLoader } from './hooks/use-model-loader';
import { useSectionPlanes } from './hooks/use-section-planes';
import { useToolManager } from './hooks/use-tool-manager';
import { useViewerInitialization } from './hooks/use-viewer-initialization';
import { handleClick } from './utils/handleClick';

export function ViewerContent({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
  useViewerInitialization(canvasRef);
  const { state, dispatch, setActiveTool } = useToolManager(canvasRef);
  const modelUrl = 'https://xeokit.github.io/xeokit-sdk/assets/models/xkt/v10/ifc/rac.xkt';
  const { isLoading } = useModelLoader(modelUrl);
  const [selectedMeta, setSelectedMeta] = useState<MetaObject | null>(null);
  const {
    toggleSectionPlane,
    editSectionPlane,
    flipAllSectionPlanes,
    flipSectionPlane,
    deleteSectionPlane,
    clearAllSectionPlanes,
    selectSectionPlane,
    hideAllSectionPlanes,
    showAllSectionPlanes,
  } = useSectionPlanes();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (id: string) => setOpenDropdown(openDropdown === id ? null : id);

  const handleCloseModal = () => dispatch({ type: 'SET_ACTIVE_TOOL', payload: '' });

  const handleResetAll = () => {
    if (state.viewer) {
      state.viewer.cameraFlight.flyTo({ aabb: state.viewer.scene.aabb });
    }
  };

  const [debugInfo, setDebugInfo] = useState({ activeTool: '', highlightedItem: null as string | null });
  useEffect(() => {
    setDebugInfo({ activeTool: state.activeTool, highlightedItem: state.highlightedItemId });
  }, [state.activeTool, state.highlightedItemId]);

  return (
    <div className='h-screen relative overflow-hidden'>
      {selectedMeta && (
        <div className='absolute z-10 top-0 right-0 w-96 bg-white shadow-lg z-50'>
          <Properties metaObj={selectedMeta} />
        </div>
      )}
      <canvas id='myNavCubeCanvas' className='absolute top-[20px] right-[20px] w-[150px] h-[150px] z-10 bg-transparent visible' />
      <button onClick={handleResetAll} className='absolute top-[50px] right-[150px] z-[10] bg-white border-none p-[6px] rounded-[6px] shadow-md'>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='black' viewBox='0 0 24 24'>
          <path d='M12 3l10 9h-3v9h-6v-6H11v6H5v-9H2l10-9z'></path>
        </svg>
      </button>
      <div className='overflow-hidden'>
        <div className='flex flex-col h-screen bg-[#ccc] relative'>
          <canvas ref={canvasRef} id='viewerCanvas' className='w-full h-full' onClick={(event) => handleClick({ event, state, canvasRef })} />{' '}
          {isLoading && <LoadingIndicator loading={isLoading} />}
        </div>
      </div>

      <ViewerToolbar activeTool={state.activeTool} setActiveTool={setActiveTool} />
      <SectionModal
        state={state}
        handleCloseModal={handleCloseModal}
        flipAllSectionPlanes={flipAllSectionPlanes}
        clearAllSectionPlanes={clearAllSectionPlanes}
        hideAllSectionPlanes={hideAllSectionPlanes}
        showAllSectionPlanes={showAllSectionPlanes}
        toggleSectionPlane={toggleSectionPlane}
        selectSectionPlane={selectSectionPlane}
        editSectionPlane={editSectionPlane}
        flipSectionPlane={flipSectionPlane}
        deleteSectionPlane={deleteSectionPlane}
        toggleDropdown={toggleDropdown}
      />

      {/* Add the ContextMenuComponent */}
      <ContextMenu />
    </div>
  );
}
