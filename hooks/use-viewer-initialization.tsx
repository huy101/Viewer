import {
  AngleMeasurementsMouseControl,
  AngleMeasurementsPlugin,
  DistanceMeasurementsMouseControl,
  DistanceMeasurementsPlugin,
  NavCubePlugin,
  SectionPlanesPlugin,
  TreeViewPlugin,
  Viewer,
  XKTLoaderPlugin,
} from '@xeokit/xeokit-sdk';
import type React from 'react';
import { useEffect } from 'react';

import { useViewer } from '../context/viewer-context';

export function useViewerInitialization(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const { dispatch } = useViewer();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize viewer
    const viewer = new Viewer({
      canvasId: 'viewerCanvas',
      canvas: canvasRef.current,
      transparent: true,
    });

    // Initialize NavCube
    new NavCubePlugin(viewer, {
      canvasId: 'myNavCubeCanvas',
      visible: true,
      size: 150,
      alignment: 'topRight',
      opacity: 0.95,
      borderRadius: 5,
      interactive: true,
      cameraFly: true,
      cameraFlyDuration: 0.6,
      cameraFitFOV: 50,
      fitVisible: true,
      synchProjection: true,
      frontColor: '#DDDDDD',
      backColor: '#DDDDDD',
      leftColor: '#BBBBBB',
      rightColor: '#BBBBBB',
      topColor: '#EEEEEE',
      bottomColor: '#AAAAAA',
      edgeColor: [0.2, 0.2, 0.2],
      highlightColor: [0.8, 0.8, 0],
      faceTextColor: [0, 0, 0],
      fontSize: 14,
      fontFamily: 'Arial',
      shadowVisible: true,
      shadowOpacity: 0.2,
      shadowBlur: 20,
      shadowOffset: [0, 3],
    });

    // Initialize Section Planes
    const sectionPlanes = new SectionPlanesPlugin(viewer, {
      overviewVisible: false,
    });

    // Initialize angle measurements
    const angleMeasurements = new AngleMeasurementsPlugin(viewer);
    const angleMeasurementsMouseControl = new AngleMeasurementsMouseControl(angleMeasurements, {});
    angleMeasurementsMouseControl.snapping = true;

    // Initialize distance measurements
    const distance = new DistanceMeasurementsPlugin(viewer);
    const distanceCtrl = new DistanceMeasurementsMouseControl(distance, {});
    distanceCtrl.snapping = true;

    // Initialize XKT loader
    const xktLoader = new XKTLoaderPlugin(viewer);

    // Initialize TreeView
    let treeView = null;
    const treeContainer = document.getElementById('myTreeViewContainer');
    if (treeContainer) {
      treeView = new TreeViewPlugin(viewer, {
        containerElement: treeContainer,
        autoAddModels: false,
        pruneEmptyNodes: true,
        hierarchy: 'containment',
      });
    } else {
      console.warn('TreeView container not found during initialization');
    }

    // Update context with initialized plugins
    dispatch({
      type: 'INIT_VIEWER',
      payload: {
        viewer,
        treeView,
        anglePlugin: angleMeasurementsMouseControl,
        distancePlugin: distanceCtrl,

        sectionPlanes,
        angleMeasurementsPlugin: angleMeasurements,
        distanceMeasurementsPlugin: distance,
        xktLoader,
      },
    });

    return () => viewer.destroy();
  }, [canvasRef, dispatch]);
}
