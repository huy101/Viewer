import { useCallback, useEffect } from 'react';
import { useRef } from 'react';

import type { SectionPlaneInfo } from '../context/viewer-context';
import { useViewer } from '../context/viewer-context';

export function useSectionPlanes() {
  const { state, dispatch } = useViewer();
  const { viewer, sectionPlanes, sectionPlanesList, activeSectionId, activeTool } = state;
  const sectionCounterRef = useRef(1);

  // Add click handler for creating section planes when section tool is active
  useEffect(() => {
    if (!viewer || !sectionPlanes) return;

    const handleCanvasClick = (event) => {
      if (activeTool !== 'section') return;

      // Get the canvas coordinates
      // Get the canvas element and its coordinates
      const canvas = viewer.scene.canvas.canvas;
      const canvasBounds = canvas.getBoundingClientRect();
      if (!canvasBounds) return;
      const canvasX = event.clientX - canvasBounds.left;
      const canvasY = event.clientY - canvasBounds.top;

      // Pick an entity at the given canvas coordinates
      const pickResult = viewer.scene.pick({
        canvasPos: [canvasX, canvasY],
        pickSurface: true, // Try to pick a point on an entity surface
      });

      if (pickResult && pickResult.worldPos) {
        createSectionPlane(pickResult);
      }
    };

    // Add click event listener to the canvas
    const canvas = viewer.scene.canvas.canvas;
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      // Remove the event listener when the component unmounts
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [viewer, sectionPlanes, activeTool]);

  // Memoize section plane operations with useCallback
  const createSectionPlane = useCallback(
    (pickResult) => {
      if (!sectionPlanes) return null;

      // Use the pick point to position the section plane
      const worldPos = pickResult.worldPos || [0.5, 2.5, 5.0];

      // Create unique ID for the new section plane
      const planeId = `sectionPlane-${Date.now()}`;
      const planeName = `Section ${sectionCounterRef.current++}`;

      // Create new section plane at the click position
      const newSectionPlane = sectionPlanes.createSectionPlane({
        id: planeId,
        pos: worldPos,
        dir: [1.0, 0.0, 0.0], // Default direction (can be adjusted)
        active: true,
      });

      // Add to our tracking state with enhanced info
      const newSectionInfo: SectionPlaneInfo = {
        id: planeId,
        name: planeName,
        plane: newSectionPlane,
        active: true,
      };

      dispatch({ type: 'ADD_SECTION_PLANE', payload: newSectionInfo });

      // Show the control for the new section plane
      sectionPlanes.hideControl();
      sectionPlanes.showControl(planeId);
      dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: planeId });

      return newSectionPlane;
    },
    [sectionPlanes, sectionPlanesList.length, dispatch],
  );

  const toggleSectionPlane = useCallback(
    (id: string) => {
      const section = sectionPlanesList.find((s) => s.id === id);
      if (section) {
        section.plane.active = !section.active;
        dispatch({ type: 'TOGGLE_SECTION_PLANE', payload: id });
      }
    },
    [sectionPlanesList, dispatch],
  );

  const editSectionPlane = useCallback(
    (id: string) => {
      const section = sectionPlanesList.find((s) => s.id === id);
      if (section && sectionPlanes) {
        dispatch({ type: 'SET_EDITING_SECTION_NAME', payload: id });
        dispatch({ type: 'SET_TEMP_SECTION_NAME', payload: section.name });

        // Show control for this section plane
        sectionPlanes.hideControl();
        sectionPlanes.showControl(id);
        dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: id });
      }
    },
    [sectionPlanesList, sectionPlanes, dispatch],
  );

  const flipSectionPlane = useCallback(
    (id: string) => {
      const sectionInfo = sectionPlanesList.find((s) => s.id === id);
      if (sectionInfo && sectionInfo.plane) {
        // Get current direction and invert it
        const dir = sectionInfo.plane.dir;
        sectionInfo.plane.dir = [-dir[0], -dir[1], -dir[2]];

        // Update active control if needed
        if (activeSectionId === id && sectionPlanes) {
          sectionPlanes.hideControl();
          sectionPlanes.showControl(id);
        }
      }
    },
    [sectionPlanesList, activeSectionId, sectionPlanes],
  );
  const flipAllSectionPlanes = useCallback(() => {
    // Flip direction of all section planes
    sectionPlanesList.forEach((sectionInfo) => {
      if (sectionInfo.plane) {
        const dir = sectionInfo.plane.dir;
        sectionInfo.plane.dir = [-dir[0], -dir[1], -dir[2]];
      }
    });

    // Refresh active control if needed
    if (sectionPlanes && activeSectionId) {
      sectionPlanes.hideControl();
      sectionPlanes.showControl(activeSectionId);
    }
  }, [sectionPlanesList, sectionPlanes, activeSectionId]);

  const deleteSectionPlane = useCallback(
    (id: string) => {
      const sectionToRemove = sectionPlanesList.find((s) => s.id === id);
      if (sectionToRemove) {
        // Destroy the plane
        sectionToRemove.plane.destroy();
        const planeName = `Section ${sectionCounterRef.current--}`;

        // Remove from our state
        dispatch({ type: 'DELETE_SECTION_PLANE', payload: id });

        // Clear active section if this was the active one
        if (activeSectionId === id) {
          dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: null });
          if (sectionPlanes) {
            sectionPlanes.hideControl();
          }
        }
      }
    },
    [sectionPlanesList, activeSectionId, sectionPlanes, dispatch],
  );

  const clearAllSectionPlanes = useCallback(() => {
    // Destroy all section planes
    sectionPlanesList.forEach((sectionInfo) => {
      sectionInfo.plane.destroy();
      sectionCounterRef.current = 1;
    });

    // Clear the section planes array
    dispatch({ type: 'CLEAR_ALL_SECTION_PLANES' });

    // Reset active section ID
    dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: null });

    // Hide any active controls
    if (sectionPlanes) {
      sectionPlanes.hideControl();
    }
  }, [sectionPlanesList, sectionPlanes, dispatch]);

  const hideAllSectionPlanes = useCallback(() => {
    // Set all section planes to inactive
    sectionPlanesList.forEach((sectionInfo) => {
      if (sectionInfo.plane && sectionInfo.active) {
        sectionInfo.plane.active = false;
        // Update the state to reflect the change
        dispatch({ type: 'TOGGLE_SECTION_PLANE', payload: sectionInfo.id });
      }
    });
  }, [sectionPlanesList, dispatch]);

  const showAllSectionPlanes = useCallback(() => {
    // Set all section planes to active
    sectionPlanesList.forEach((sectionInfo) => {
      if (sectionInfo.plane && !sectionInfo.active) {
        sectionInfo.plane.active = true;
        // Update the state to reflect the change
        dispatch({ type: 'TOGGLE_SECTION_PLANE', payload: sectionInfo.id });
      }
    });
  }, [sectionPlanesList, dispatch]);

  const selectSectionPlane = useCallback(
    (id: string) => {
      dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: id });

      if (sectionPlanes) {
        sectionPlanes.hideControl();
        sectionPlanes.showControl(id);
      }
    },
    [sectionPlanes, dispatch],
  );

  return {
    createSectionPlane,
    toggleSectionPlane,
    editSectionPlane,
    flipSectionPlane,
    flipAllSectionPlanes,
    deleteSectionPlane,
    clearAllSectionPlanes,
    hideAllSectionPlanes,
    showAllSectionPlanes,
    selectSectionPlane,
  };
}
