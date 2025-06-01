import { MetaObject } from '@xeokit/xeokit-sdk';
import React from 'react';

type PropertiesProps = {
  metaObj: MetaObject | null;
  onClose?: () => void;
};

const Properties: React.FC<PropertiesProps> = ({ metaObj, onClose }) => {
  if (!metaObj) {
    return <div className='p-4 text-gray-600 text-sm'>Select an object to see properties.</div>;
  }

  // Extract attributes if they exist
  const attributes = metaObj.attributes || {};
  const hasAttributes = Object.keys(attributes).length > 0;

  return (
    <div className='z-50 p-4 bg-white shadow-lg rounded-lg max-w-md'>
      <div className='border-b pb-2 mb-4 flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Properties</h2>
        {onClose && (
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700' aria-label='Close properties panel'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        )}
      </div>
      <div>
        <table className='w-full text-sm text-left text-gray-700'>
          <tbody>
            <tr className='border-b'>
              <td className='py-2 font-medium w-1/3'>Name:</td>
              <td className='py-2'>{metaObj.name || 'N/A'}</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 font-medium'>Class:</td>
              <td className='py-2'>{metaObj.type || 'N/A'}</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 font-medium'>UUID:</td>
              <td className='py-2'>{metaObj.id || 'N/A'}</td>
            </tr>
            {metaObj.originalSystemId && (
              <tr className='border-b'>
                <td className='py-2 font-medium'>Original ID:</td>
                <td className='py-2'>{metaObj.originalSystemId}</td>
              </tr>
            )}
          </tbody>
        </table>

        {hasAttributes ? (
          <div className='mt-4'>
            <h3 className='font-medium mb-2'>Attributes</h3>
            <table className='w-full text-sm text-left text-gray-700'>
              <tbody>
                {Object.entries(attributes).map(([key, value]) => (
                  <tr key={key} className='border-b'>
                    <td className='py-2 font-medium w-1/3'>{key}:</td>
                    <td className='py-2'>{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='mt-4 text-xs text-gray-500 italic'>No property sets found for this object.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
