// utils/handleClick.ts
import type { MouseEvent } from 'react';

export type HandleClickProps = {
  event: MouseEvent<HTMLCanvasElement, MouseEvent>;
  state: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  createSectionPlane: (pickResult: any) => void;
};

export function handleClick({ event, state, canvasRef }: HandleClickProps) {
  const viewer = state.viewer;
  if (!viewer || !viewer.scene) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const canvasPos = [event.clientX - rect.left, event.clientY - rect.top];

  const pickResult = viewer.scene.pick({
    canvasPos,
    pickSurface: true,
  });

  if (pickResult) {
    if (pickResult.entity) {
      const entityId = pickResult.entity.id;

      if (state.activeTool === 'choose') {
        const entity = viewer.scene.objects[entityId];
        const isHighlighted = entity ? entity.highlighted : false;

        entity.selected = !entity.selected;
      }
    }
  }
}
type GetPickedEntityIdProps = {
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  viewer: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export function getPickedEntityId({ event, viewer, canvasRef }: GetPickedEntityIdProps): string | null {
  if (!viewer || !viewer.scene || !canvasRef.current) return null;

  const rect = canvasRef.current.getBoundingClientRect();
  const canvasPos = [event.clientX - rect.left, event.clientY - rect.top];

  const pickResult = viewer.scene.pick({ canvasPos, pickSurface: true });
  if (pickResult?.entity) {
    return pickResult.entity.id;
  }

  return null;
}
export function handleHide(entityId: string, viewer: any) {
  viewer.scene.setObjectsVisible([entityId], false);
}

export function handleChoose(entityId: string, viewer: any) {
  const entity = viewer.scene.objects[entityId];
  const isHighlighted = entity?.highlighted ?? false;

  viewer.scene.setObjectsHighlighted([entityId], !isHighlighted);
  if (entity) {
    entity.highlighted = !isHighlighted;
  }
}
