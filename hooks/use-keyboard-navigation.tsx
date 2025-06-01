import { useEffect } from 'react';

import { useViewer } from '../context/viewer-context';

export function useKeyboardNavigation() {
  const { state, dispatch } = useViewer();
  const { viewer, isWalkMode } = state;

  useEffect(() => {
    if (!viewer) return;
    console.log('🚶‍♂️ Walk mode:', isWalkMode);
    // Always apply the correct mode based on isWalkMode state
    // Removed the early return to ensure mode is always correctly set

    if (isWalkMode) {
      viewer.cameraControl.navMode = 'firstPerson';
      viewer.cameraControl.firstPerson = {
        walkSpeed: 3.5,
        runSpeed: 6.0,
        turnSpeed: 0.08,
        smoothing: true,
        smoothingFactor: 0.5,
        firstPersonHeight: 1.7,
        restrictVerticalLook: false,
      };
      console.log('🚶‍♂️ Walk mode: ON');
    } else {
      viewer.cameraControl.navMode = 'orbit';
      console.log('👁 Orbit mode: OFF');
    }
  }, [viewer, isWalkMode]);

  const toggleWalkMode = () => {
    dispatch({ type: 'SET_WALK_MODE', payload: !isWalkMode });
  };

  return { isWalkMode, toggleWalkMode };
}
