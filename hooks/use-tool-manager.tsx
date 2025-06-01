import { useCallback, useEffect, useRef } from 'react';

import { useViewer } from '../context/viewer-context';
import { useKeyboardNavigation } from './use-keyboard-navigation';

export function useToolManager() {
  const { state, dispatch } = useViewer();
  const { activeTool, anglePlugin, distancePlugin, sectionPlanes, viewer, showModal } = state;
  const { toggleWalkMode } = useKeyboardNavigation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const setActiveTool = useCallback(
    (tool: string) => {
      if (tool === 'walk') {
        toggleWalkMode();
      } else if (state.isWalkMode) {
        dispatch({ type: 'SET_WALK_MODE', payload: false });
      }

      dispatch({ type: 'SET_ACTIVE_TOOL', payload: tool });
    },
    [dispatch, toggleWalkMode, state.isWalkMode],
  );

  // Highlight logic for "choose" tool

  // Handle tool activation/deactivation
  useEffect(() => {
    if (!anglePlugin || !distancePlugin || !viewer) return;

    // Deactivate all tools first
    anglePlugin.deactivate();
    distancePlugin.deactivate();

    // Activate the selected tool
    switch (activeTool) {
      case 'angle':
        anglePlugin.activate();
        break;
      case 'distance':
        distancePlugin.activate();
        break;
      case 'section':
        dispatch({ type: 'SET_SHOW_MODAL', payload: true });
        break;
      case 'choose':
        // Make sure the choose tool is properly set up
        console.log('Choose tool activated');
        break;
      default: {
        dispatch({ type: 'SET_IS_VISIBLE', payload: false });
        const timer = setTimeout(() => {
          dispatch({ type: 'SET_SHOW_MODAL', payload: false });
        }, 300);
        return () => clearTimeout(timer);
      }
    }

    // Hide section plane controls if not using the "section" tool
    if (activeTool !== 'section' && sectionPlanes) {
      sectionPlanes.hideControl();
      dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: null });
    }
  }, [activeTool, anglePlugin, distancePlugin, sectionPlanes, viewer, dispatch]);

  // Handle modal visibility with animation timing
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_IS_VISIBLE', payload: true });
      }, 10);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: 'SET_IS_VISIBLE', payload: false });
    }
  }, [showModal, dispatch]);

  return {
    state,
    dispatch,
    setActiveTool,
  };
}
