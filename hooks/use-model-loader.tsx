import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useViewer } from '../context/viewer-context';

export function useModelLoader(modelUrl: string | null) {
  const { state, dispatch } = useViewer();
  const { viewer, xktLoader, treeView, prevTreeModelId } = state;
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the loadModel function to prevent recreating on each render
  const loadModel = useCallback(async () => {
    if (!viewer?.scene || !xktLoader || !modelUrl) {
      return null;
    }

    setIsLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await axios.get(modelUrl, { responseType: 'arraybuffer' });

      if (!response.data || response.data.byteLength === 0) {
        throw new Error('Empty or invalid XKT data received');
      }

      // Generate a unique model ID
      const modelId = `mdl-${Date.now()}`;

      // Load the model
      const model = await xktLoader.load({
        id: modelId,
        xkt: response.data,
        edges: true,
      });

      if (!model) {
        throw new Error('Failed to load model');
      }

      // Update state with the new model
      dispatch({ type: 'SET_CURRENT_MODEL', payload: model });

      // Handle TreeView updates
      if (treeView) {
        // Remove previous model if it exists
        if (prevTreeModelId) {
          treeView.removeModel(prevTreeModelId);
        }

        // Add new model to TreeView
        treeView.addModel(model.id, {
          rootName: `Model ${model.id}`,
        });

        // Set up visibility toggle
        treeView.off('check'); // Remove old listeners
        treeView.on('check', (node) => {
          if (!node.objectId || !viewer.scene) return;
          viewer.scene.setObjectsVisible([node.objectId], node.checked);
        });
      }

      // Set up auto-fit camera
      model.on('loaded', () => {
        viewer.cameraFlight.flyTo({
          aabb: model.aabb,
          duration: 1,
        });
      });

      return model;
    } catch (error) {
      console.error('Error loading XKT model:', error);
      return null;
    } finally {
      setIsLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [modelUrl, viewer, xktLoader, treeView, prevTreeModelId, dispatch]);

  // Effect to load the model when dependencies change
  useEffect(() => {
    let isMounted = true;
    let currentModel = null;

    const loadAndSetModel = async () => {
      const model = await loadModel();
      if (isMounted && model) {
        currentModel = model;
      }
    };

    loadAndSetModel();

    // Cleanup function
    return () => {
      isMounted = false;

      // Safely cleanup the model
      if (currentModel) {
        try {
          if (typeof currentModel.off === 'function') {
            currentModel.off('loaded');
          }
          if (typeof currentModel.destroy === 'function') {
            currentModel.destroy();
          }
        } catch (err) {
          console.warn('Error during model cleanup:', err);
        }
      }
    };
  }, [loadModel]);

  return { isLoading };
}
