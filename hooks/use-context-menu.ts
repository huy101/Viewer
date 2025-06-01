import { ContextMenu, Entity, metaModel, MetaObject, metaScene, Scene } from '@xeokit/xeokit-sdk';
import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';

import Properties from '../components/properties';
import { useViewer } from '../context/viewer-context';
export function useContextMenu() {
  const { state } = useViewer();
  const viewer = state.viewer;
  const [selectedMeta, setSelectedMeta] = useState<MetaObject | null>(null);
  // Reference to the XeoKit ContextMenu instance
  const contextMenuRef = useRef<any>(null);

  // Initialize the context menu
  useEffect(() => {
    if (!viewer) return;

    // Create the XeoKit ContextMenu instance
    contextMenuRef.current = new ContextMenu({
      enabled: true,
      hideOnMouseDown: true,
      hideOnAction: true,
      items: [
        // trong constructor ContextMenu.items

        [
          {
            getTitle: (context) => {
              if (!viewer || !context.entity) return 'Xray';

              const isSelected = viewer.scene.objects[context.entity.id]?.xrayed;
              return isSelected ? 'UnXray' : 'Xray';
            },
            getEnabled: (context) => !!context.entity,
            doAction: (context) => {
              if (!viewer || !context.entity) return;
              const id = context.entity.id;
              const entityInScene = viewer.scene.objects[id];
              const isSelected = entityInScene.xrayed || false;
              viewer.scene.setObjectsXRayed([id], !isSelected);
            },
          },
        ],
        [
          {
            title: 'properties',
            getEnabled: (context) => !!context.entity,
            doAction: (context) => {
              if (!viewer || !context.entity) return;
              const id = context.entity.id;
              const metaObj = viewer.metaScene.metaObjects[id] as MetaObject;
              if (!metaObj) {
                console.warn(`No MetaObject metadata for entity ${id}`);
              } else {
                setSelectedMeta(metaObj || null); // Gửi dữ liệu đến component
              }
            },
          },
        ],
        [
          {
            getTitle: (context) => {
              if (!viewer || !context.entity) return 'Select';

              const isSelected = viewer.scene.objects[context.entity.id]?.selected;
              return isSelected ? 'Unselect' : 'Select';
            },
            getEnabled: (context) => !!context.entity,
            doAction: (context) => {
              if (!viewer || !context.entity) return;
              const id = context.entity.id;
              const metaObj = viewer.metaScene.metaObjects[id] as MetaObject;
              if (!metaObj) {
                console.warn(`No MetaObject metadata for entity ${id}`);
              } else {
                console.log('Name:', metaObj.name);
                console.log('Class (type):', metaObj.type);
                console.log('UUID:', metaObj.id);
                console.log('OriginalSysId:', metaObj.originalSystemId);
                console.log('Parent ID:', metaObj.parentId);
                console.log('Attributes:', metaObj.attributes);
                console.log('External metadata:', metaObj.external);
              }

              const entityInScene = viewer.scene.objects[id];

              if (!entityInScene) return;
              const isSelected = entityInScene.selected || false;
              viewer.scene.setObjectsSelected([id], !isSelected);
            },
          },
        ],
        [
          {
            getTitle: () => {
              if (!viewer || !viewer.scene) return 'Select all';
              // Lấy danh sách non-model IDs
              const objs = viewer.scene.objects;
              const ids = Object.keys(objs).filter((id) => !objs[id].isModel);
              // Kiểm tra xem tất cả đã selected chưa
              const allSelected = ids.length > 0 && ids.every((id) => objs[id].selected);
              return allSelected ? 'Unselect all' : 'Select all';
            },
            getEnabled: () => !!viewer && !!viewer.scene,
            doAction: () => {
              if (!viewer || !viewer.scene) return;
              const objs = viewer.scene.objects;
              const ids = Object.keys(objs).filter((id) => !objs[id].isModel);
              // Nếu allSelected thì unselect (false), ngược lại select (true)
              const allSelected = ids.length > 0 && ids.every((id) => objs[id].selected);
              viewer.scene.setObjectsSelected(ids, !allSelected);
            },
          },
        ],

        // [
        //   {
        //     title: 'Show All',
        //     getEnabled: () => !!viewer && !!viewer.scene,
        //     doAction: () => {
        //       if (!viewer || !viewer.scene) return;
        //       viewer.scene.setObjectsVisible(viewer.scene.objectIds, true);
        //     },
        //   },
        // ],
        [
          {
            title: 'Reset View',
            getEnabled: () => !!viewer,
            doAction: () => {
              if (!viewer) return;
              viewer.cameraFlight.flyTo({ aabb: viewer.scene.aabb });
            },
          },
        ],
      ],
    });

    return () => {
      // Clean up the context menu when the component unmounts
      if (contextMenuRef.current) {
        contextMenuRef.current.destroy();
        contextMenuRef.current = null;
      }
    };
  }, [viewer]);

  // Set up the context menu event handler
  useEffect(() => {
    if (!viewer || !viewer.scene || !viewer.scene.canvas || !contextMenuRef.current) return;

    const canvasEl = viewer.scene.canvas.canvas;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      if (!contextMenuRef.current?.enabled) return;

      const canvas = viewer.scene.canvas.canvas;
      const rect = canvas.getBoundingClientRect();
      const canvasPos = [e.clientX - rect.left, e.clientY - rect.top];

      const picked = viewer.scene.pick({ canvasPos });

      // Luôn gán context: nếu có entity thì truyền, không thì để empty
      if (picked && picked.entity) {
        contextMenuRef.current.context = { entity: picked.entity };
      } else {
        contextMenuRef.current.context = {};
      }

      // Hiển thị menu (với items đã được filter qua getEnabled)
      contextMenuRef.current.show(e.pageX, e.pageY);
    };

    canvasEl.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvasEl.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [viewer]);

  const hideContextMenu = useCallback(() => {
    if (contextMenuRef.current) {
      contextMenuRef.current.hide();
    }
  }, []);

  const isContextMenuVisible = useCallback(() => {
    return contextMenuRef.current ? contextMenuRef.current.shown : false;
  }, []);

  return {
    contextMenu: contextMenuRef.current,
    hideContextMenu,
    isContextMenuVisible,
    selectedMeta,
    setSelectedMeta,
  };
}
