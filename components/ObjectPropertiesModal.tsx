'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useContextMenuContext } from '../context/ContextMenuContext';

export function ObjectPropertiesModal() {
  const { currentProperties, isPropertiesVisible, hideProperties } = useContextMenuContext();

  if (!currentProperties) {
    return null;
  }

  return (
    <Dialog open={isPropertiesVisible} onOpenChange={hideProperties}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Object Properties</DialogTitle>
        </DialogHeader>
        <div className='p-4'>
          <div className='space-y-3'>
            <div className='grid grid-cols-[100px_1fr] gap-2'>
              <div className='font-semibold text-right'>Name:</div>
              <div>{currentProperties.name}</div>
            </div>
            <div className='grid grid-cols-[100px_1fr] gap-2'>
              <div className='font-semibold text-right'>Class:</div>
              <div>{currentProperties.class}</div>
            </div>
            <div className='grid grid-cols-[100px_1fr] gap-2'>
              <div className='font-semibold text-right'>UUID:</div>
              <div>{currentProperties.uuid}</div>
            </div>
            <div className='grid grid-cols-[100px_1fr] gap-2'>
              <div className='font-semibold text-right'>Viewer ID:</div>
              <div>{currentProperties.viewerId}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
