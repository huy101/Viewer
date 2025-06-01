// components/SectionModal.tsx
import React from 'react';

type SectionModalProps = {
  state: any;
  handleCloseModal: () => void;
  flipAllSectionPlanes: () => void;
  clearAllSectionPlanes: () => void;
  hideAllSectionPlanes: () => void;
  showAllSectionPlanes: () => void;
  toggleSectionPlane: (id: string) => void;
  selectSectionPlane: (id: string) => void;
  editSectionPlane: (id: string) => void;
  flipSectionPlane: (id: string) => void;
  deleteSectionPlane: (id: string) => void;
  toggleDropdown: (id: string) => void;
};

const SectionModal: React.FC<SectionModalProps> = ({
  state,
  handleCloseModal,
  flipAllSectionPlanes,
  clearAllSectionPlanes,
  hideAllSectionPlanes,
  showAllSectionPlanes,
  toggleSectionPlane,
  selectSectionPlane,
  editSectionPlane,
  flipSectionPlane,
  deleteSectionPlane,
  toggleDropdown,
}) => {
  if (!state.showModal) return null;

  return (
    <div
      className={`
      fixed bottom-[100px] right-8 w-full max-w-[500px] z-[1000]
      bg-[#f7f7f9] rounded-[10px] overflow-hidden transition-all duration-300 ease-in-out
      ${state.isVisible ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}
    `}
    >
      <div className='px-[15px] py-[10px] bg-[#f7f7f9] border-b border-[#dadada] flex items-center'>
        <h3 className='m-0 text-[20px] font-bold leading-[24px] text-[#121212] flex-1'>Mặt cắt</h3>
        <button
          onClick={handleCloseModal}
          className='cursor-pointer text-[20px] text-[#a4a4a4] bg-transparent border-none outline-none p-0 m-0 flex items-center justify-center w-[18px] h-[18px]'
        >
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.79572 8.99974L14.4605 4.33498C14.5659 4.22947 14.625 4.08643 14.625 3.93731C14.6249 3.78819 14.5657 3.64519 14.4602 3.53975C14.3548 3.43431 14.2118 3.37505 14.0627 3.375C13.9135 3.37495 13.7705 3.43412 13.665 3.5395L9.00024 8.20426L4.33548 3.5395C4.22997 3.43412 4.08693 3.37495 3.93781 3.375C3.78869 3.37505 3.64569 3.43431 3.54025 3.53975C3.4348 3.64519 3.37555 3.78819 3.3755 3.93731C3.37545 4.08643 3.43462 4.22947 3.54 4.33498L8.20476 8.99974L3.54 13.6645C3.48771 13.7167 3.44623 13.7787 3.41792 13.847C3.38961 13.9152 3.37502 13.9884 3.375 14.0623C3.37498 14.1362 3.38951 14.2094 3.41778 14.2777C3.44605 14.3459 3.4875 14.408 3.53975 14.4602C3.592 14.5125 3.65404 14.5539 3.72232 14.5822C3.79059 14.6105 3.86377 14.625 3.93767 14.625C4.01156 14.625 4.08473 14.6104 4.15299 14.5821C4.22125 14.5537 4.28326 14.5123 4.33548 14.46L9.00024 9.79522L13.665 14.46C13.7705 14.5654 13.9135 14.6245 14.0627 14.6245C14.2118 14.6244 14.3548 14.5652 14.4602 14.4597C14.5657 14.3543 14.6249 14.2113 14.625 14.0622C14.625 13.913 14.5659 13.77 14.4605 13.6645L9.79572 8.99974Z'
              fill='currentColor'
            />
          </svg>
        </button>
      </div>
      <div className='p-[15px] bg-[#f7f7f9] overflow-auto max-h-full'>
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <button
              onClick={flipAllSectionPlanes}
              className='border w-full text-[#006fed] border-[#006fed] bg-transparent flex items-center justify-center rounded-[5px] p-2'
              disabled={state.sectionPlanesList.length === 0}
            >
              <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg' className='mr-1'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.38416 2.34539C7.49515 2.09086 7.75564 1.9533 8.01088 2.01441C8.26612 2.07553 8.44767 2.31894 8.44767 2.60004V15.3996C8.44767 15.7309 8.19779 15.9995 7.88953 15.9995H2.30814C2.11721 15.9995 1.93953 15.8946 1.83711 15.7214C1.73469 15.5482 1.72173 15.3308 1.80277 15.1449L7.38416 2.34539Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16.2572 13.2561C16.5363 13.1154 16.8686 13.2447 16.9995 13.5447L17.6971 15.1446C17.7782 15.3305 17.7652 15.5479 17.6628 15.7211C17.5604 15.8943 17.3827 15.9993 17.1918 15.9993H15.7964C15.4882 15.9993 15.2383 15.7306 15.2383 15.3993C15.2383 15.0679 15.4882 14.7993 15.7964 14.7993H16.3137L15.9887 14.054C15.8579 13.754 15.9781 13.3967 16.2572 13.2561Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M11.6128 13.1992C11.9211 13.1992 12.171 13.4678 12.171 13.7992V14.7992H13.0082C13.3164 14.7992 13.5663 15.0678 13.5663 15.3991C13.5663 15.7305 13.3164 15.9991 13.0082 15.9991H11.6128C11.3046 15.9991 11.0547 15.7305 11.0547 15.3991V13.7992C11.0547 13.4678 11.3046 13.1992 11.6128 13.1992Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M11.6128 8.39844C11.9211 8.39844 12.171 8.66706 12.171 8.99842V10.5984C12.171 10.9297 11.9211 11.1983 11.6128 11.1983C11.3046 11.1983 11.0547 10.9297 11.0547 10.5984V8.99842C11.0547 8.66706 11.3046 8.39844 11.6128 8.39844Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.1651 8.4553C14.4442 8.31466 14.7766 8.44388 14.9074 8.74391L15.6051 10.3438C15.7359 10.6439 15.6157 11.0011 15.3366 11.1418C15.0575 11.2824 14.7252 11.1532 14.5943 10.8532L13.8966 9.25321C13.7658 8.95318 13.886 8.59594 14.1651 8.4553Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M11.4915 2.01441C11.7467 1.9533 12.0072 2.09086 12.1182 2.34539L13.5135 5.54527C13.6444 5.8453 13.5242 6.20254 13.2451 6.34318C12.966 6.48382 12.6336 6.3546 12.5028 6.05457L12.171 5.29359V5.79992C12.171 6.13128 11.9211 6.3999 11.6128 6.3999C11.3046 6.3999 11.0547 6.13128 11.0547 5.79992V2.60004C11.0547 2.31894 11.2362 2.07553 11.4915 2.01441Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span className='text-[#006fed]'>Đảo hướng tất cả</span>
            </button>
          </div>
          <div className='flex-1'>
            <button
              onClick={clearAllSectionPlanes}
              className='w-full text-[#ed6a5e] border border-[#ed6a5e] bg-transparent flex items-center justify-center rounded-[5px] p-2'
              disabled={state.sectionPlanesList.length === 0}
            >
              <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg' className='mr-1'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.39347 1C6.92474 1 6.48654 1.20226 6.17169 1.54356C5.85829 1.88327 5.68945 2.33468 5.68945 2.79661V3.68379H4.09099H2.71599C2.45863 3.68379 2.25 3.88733 2.25 4.13841C2.25 4.38949 2.45863 4.59303 2.71599 4.59303H3.625V14.975C3.625 15.244 3.73229 15.5037 3.92611 15.6966C4.12025 15.8898 4.38554 16 4.66415 16H13.8347C14.1133 16 14.3786 15.8898 14.5727 15.6966C14.7666 15.5037 14.8738 15.244 14.8738 14.975V4.59303H15.784C16.0414 4.59303 16.25 4.38949 16.25 4.13841C16.25 3.88733 16.0414 3.68379 15.784 3.68379H14.4078H12.8116V2.79661C12.8116 2.33468 12.6427 1.88327 12.3293 1.54356C12.0145 1.20226 11.5763 1 11.1075 1H7.39347Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span className='text-[#ed6a5e]'>Xóa tất cả</span>
            </button>
          </div>
        </div>
        <hr className='mt-4 mb-2' />
        <div className='flex items-center justify-end'>
          <button
            onClick={hideAllSectionPlanes}
            className='inline-flex items-center justify-center rounded cursor-pointer text-[12px] font-bold px-2 py-1 gap-1 bg-transparent text-[#6b6b6b] border border-transparent'
          >
            <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.8842 6.70707C4.15793 5.4645 6.15379 4.21094 9 4.21094C11.8462 4.21094 13.8421 5.4645 15.1158 6.70707C15.7514 7.3271 16.2098 7.94638 16.5099 8.41138C16.6602 8.64422 16.7714 8.83937 16.8458 8.97797C16.8831 9.0473 16.9111 9.10258 16.9303 9.14145C16.9399 9.1609 16.9473 9.17625 16.9525 9.18721L16.9587 9.20035L16.9605 9.20438L16.9612 9.20575L16.9614 9.20628C16.9615 9.20649 16.9616 9.20669 16.5543 9.38323C16.9616 9.5598 16.9615 9.56 16.9614 9.56022L16.9612 9.56074L16.9605 9.56212L16.9587 9.56615L16.9525 9.57928C16.9473 9.59024 16.9399 9.60559 16.9303 9.62503C16.9111 9.6639 16.8831 9.71917 16.8458 9.78849C16.7714 9.92706 16.6602 10.1222 16.5099 10.355C16.2098 10.8199 15.7513 11.439 15.1158 12.0589C13.842 13.3012 11.8462 14.5545 9 14.5545C6.15382 14.5545 4.15797 13.3012 2.88423 12.0589C2.24865 11.439 1.79022 10.8199 1.4901 10.355C1.33982 10.1222 1.2286 9.92706 1.15417 9.78849C1.11694 9.71917 1.08887 9.6639 1.06969 9.62503C1.06009 9.60559 1.05271 9.59024 1.04751 9.57928L1.04134 9.56615L1.03948 9.56212L1.03885 9.56074L1.03861 9.56022C1.03851 9.56 1.03842 9.5598 1.44567 9.38323C1.0384 9.20669 1.03849 9.20649 1.03859 9.20628L1.03883 9.20575L1.03946 9.20438L1.04133 9.20035L1.0475 9.18721C1.05269 9.17625 1.06007 9.1609 1.06967 9.14145C1.08886 9.10258 1.11693 9.0473 1.15415 8.97797C1.22858 8.83937 1.3398 8.64422 1.49008 8.41138C1.7902 7.94638 2.24862 7.3271 2.8842 6.70707Z'
                fill='currentColor'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.99911 7.1839C7.7552 7.1839 6.74681 8.16752 6.74681 9.38087C6.74681 10.5942 7.7552 11.5779 8.99911 11.5779C10.243 11.5779 11.2514 10.5942 11.2514 9.38087C11.2514 8.16752 10.243 7.1839 8.99911 7.1839ZM5.85547 9.38087C5.85547 7.68734 7.26293 6.31445 8.99911 6.31445C10.7353 6.31445 12.1428 7.68734 12.1428 9.38087C12.1428 11.0744 10.7353 12.4473 8.99911 12.4473C7.26293 12.4473 5.85547 11.0744 5.85547 9.38087Z'
                fill='currentColor'
              ></path>
              <path fillRule='evenodd' clipRule='evenodd' d='M1.06696 14.5549L16.3981 2.99911L16.75 3.44336L1.41889 14.9991L1.06696 14.5549Z' fill='currentColor'></path>
            </svg>
            <span>Ẩn tất cả</span>
          </button>
          <button
            onClick={showAllSectionPlanes}
            className='inline-flex items-center justify-center rounded cursor-pointer text-[12px] font-bold px-2 py-1 gap-1 bg-transparent text-[#6b6b6b] border border-transparent ml-2'
          >
            <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.8842 6.41322C4.15793 5.21192 6.15379 4 9 4C11.8462 4 13.8421 5.21192 15.1158 6.41322C15.7514 7.01266 16.2098 7.61137 16.5099 8.06092C16.6602 8.28603 16.7714 8.4747 16.8458 8.60869C16.8831 8.67572 16.9111 8.72916 16.9303 8.76675C16.9399 8.78555 16.9473 8.80039 16.9525 8.81099L16.9587 8.82369L16.9605 8.82759L16.9612 8.82891L16.9614 8.82942C16.9615 8.82963 16.9616 8.82982 16.5543 9.0005C16.9616 9.17121 16.9615 9.1714 16.9614 9.17161L16.9612 9.17211L16.9605 9.17344L16.9587 9.17734L16.9525 9.19003C16.9473 9.20063 16.9399 9.21547 16.9303 9.23427C16.9111 9.27185 16.8831 9.32528 16.8458 9.39229C16.7714 9.52626 16.6602 9.71489 16.5099 9.93995C16.2098 10.3894 15.7513 10.988 15.1158 11.5873C13.842 12.7884 11.8462 14 9 14C6.15382 14 4.15797 12.7884 2.88423 11.5873C2.24865 10.988 1.79022 10.3894 1.4901 9.93995C1.33982 9.71489 1.2286 9.52626 1.15417 9.39229C1.11694 9.32528 1.08887 9.27185 1.06969 9.23427C1.06009 9.21547 1.05271 9.20063 1.04751 9.19003L1.04134 9.17734L1.03948 9.17344L1.03885 9.17211L1.03861 9.17161C1.03851 9.1714 1.03842 9.17121 1.44567 9.0005C1.0384 8.82982 1.03849 8.82963 1.03859 8.82942L1.03883 8.82891L1.03946 8.82759L1.04133 8.82369L1.0475 8.81099C1.05269 8.80039 1.06007 8.78555 1.06967 8.76675C1.08886 8.72916 1.11693 8.67572 1.15415 8.60869C1.22858 8.4747 1.3398 8.28603 1.49008 8.06092C1.7902 7.61137 2.24862 7.01266 2.8842 6.41322ZM1.44567 9.0005L1.0384 8.82982C0.987193 8.93849 0.987199 9.06254 1.03842 9.17121L1.44567 9.0005ZM1.94276 9.00047C1.94308 9.00106 1.94341 9.00164 1.94373 9.00223C2.00842 9.11868 2.10798 9.28781 2.24436 9.49205C2.51755 9.90119 2.93596 10.4474 3.51447 10.9929C4.66891 12.0815 6.45023 13.1594 9 13.1594C11.5498 13.1594 13.3311 12.0815 14.4855 10.9929C15.064 10.4474 15.4824 9.90119 15.7556 9.49205C15.892 9.28781 15.9916 9.11868 16.0563 9.00223C16.0566 9.00164 16.0569 9.00106 16.0572 9.00048C16.0569 8.99988 16.0566 8.99929 16.0562 8.99869C15.9916 8.88221 15.892 8.71304 15.7556 8.50875C15.4824 8.09952 15.064 7.55318 14.4855 7.00756C13.331 5.91875 11.5497 4.84057 9 4.84057C6.45026 4.84057 4.66896 5.91875 3.51451 7.00756C2.936 7.55318 2.51758 8.09952 2.24438 8.50875C2.108 8.71304 2.00844 8.88221 1.94375 8.99869C1.94342 8.99929 1.94309 8.99988 1.94276 9.00047ZM16.5543 9.0005L16.9616 9.17121C17.0128 9.06254 17.0128 8.93849 16.9616 8.82982L16.5543 9.0005Z'
                fill='currentColor'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.99911 6.87768C7.7552 6.87768 6.74681 7.82862 6.74681 9.00168C6.74681 10.1747 7.7552 11.1257 8.99911 11.1257C10.243 11.1257 11.2514 10.1747 11.2514 9.00168C11.2514 7.82862 10.243 6.87768 8.99911 6.87768ZM5.85547 9.00168C5.85547 7.36439 7.26293 6.03711 8.99911 6.03711C10.7353 6.03711 12.1428 7.36439 12.1428 9.00168C12.1428 10.639 10.7353 11.9663 8.99911 11.9663C7.26293 11.9663 5.85547 10.639 5.85547 9.00168Z'
                fill='currentColor'
              ></path>
            </svg>
            <span>Hiện tất cả</span>
          </button>
        </div>

        {/* Section Planes List */}
        {state.sectionPlanesList.length === 0 ? (
          <div id='sectionPlaneList' className='flex flex-col gap-2 mt-4 overflow-y-auto max-h-[150px]'></div>
        ) : (
          <div className='max-h-60 overflow-y-auto mt-4'>
            {state.sectionPlanesList.map((section) => (
              <div key={section.id} className={`border-b border-gray-200 py-2 ${state.activeSectionId === section.id ? 'bg-blue-50' : ''}`}>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <button
                      onClick={() => toggleSectionPlane(section.id)}
                      className='mr-2 w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black transition-colors'
                      aria-label='Toggle visibility'
                    >
                      {section.active ? (
                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z'></path>
                        </svg>
                      ) : (
                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M2.1 3.51L1 4.62l4.05 4.05C3.3 10.18 2 12 2 12s4 7 10 7c2.03 0 3.86-.6 5.37-1.62l3.01 3.01 1.11-1.11L2.1 3.51zM12 17c-4.42 0-8-4-8-5s1.24-2.41 3.14-3.57L9.6 12.3a3 3 0 004.1 4.1l1.46 1.46A7.95 7.95 0 0112 17zm3-5a3 3 0 00-3-3c-.53 0-1.03.14-1.46.39l4.07 4.07c.25-.43.39-.93.39-1.46z'></path>
                        </svg>
                      )}
                    </button>
                    <span className='text-sm font-medium cursor-pointer' onClick={() => selectSectionPlane(section.id)}>
                      {section.name}
                    </span>
                  </div>
                  <div className='flex flex-row items-end'>
                    <button
                      className='btn btn--icon flex-none p-1 mx-1'
                      onClick={() => {
                        editSectionPlane(section.id);
                        toggleDropdown(section.id);
                      }}
                    >
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M4 21H20' stroke='currentColor' strokeWidth='2' strokeLinecap='round'></path>
                        <path d='M14.5 3.5L20.5 9.5L9 21H3V15L14.5 3.5Z' stroke='currentColor' strokeWidth='2'></path>
                      </svg>
                    </button>
                    <button
                      className='btn btn--icon flex-none p-1 mx-1'
                      onClick={() => {
                        flipSectionPlane(section.id);
                        toggleDropdown(section.id);
                      }}
                    >
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M8.84425 3.12653C8.99223 2.78717 9.33956 2.60374 9.67988 2.68523C10.0202 2.76672 10.2623 3.09127 10.2623 3.46607V20.5321C10.2623 20.9739 9.92908 21.3321 9.51808 21.3321H2.07622C1.82165 21.3321 1.58474 21.1922 1.44818 20.9613C1.31161 20.7303 1.29434 20.4404 1.40239 20.1926L8.84425 3.12653Z'
                          fill='currentColor'
                        ></path>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M20.675 17.6754C21.0471 17.4879 21.4902 17.6602 21.6647 18.0602L22.5949 20.1935C22.7029 20.4413 22.6857 20.7312 22.5491 20.9622C22.4125 21.1931 22.1756 21.333 21.9211 21.333H20.0606C19.6496 21.333 19.3164 20.9748 19.3164 20.533C19.3164 20.0912 19.6496 19.7331 20.0606 19.7331H20.7503L20.317 18.7393C20.1426 18.3393 20.3028 17.8629 20.675 17.6754Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </button>
                    <button
                      className='btn btn--icon text-error flex-none p-1 mx-1'
                      onClick={() => {
                        deleteSectionPlane(section.id);
                        toggleDropdown(section.id);
                      }}
                    >
                      <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M7.14347 1C6.67474 1 6.23654 1.20226 5.92169 1.54356C5.60829 1.88327 5.43945 2.33468 5.43945 2.79661V3.68379H3.84099H2.46599C2.20863 3.68379 2 3.88733 2 4.13841C2 4.38949 2.20863 4.59303 2.46599 4.59303H3.375V14.975C3.375 15.244 3.48229 15.5037 3.67611 15.6966C3.87025 15.8898 4.13554 16 4.41415 16H13.5847C13.8633 16 14.1286 15.8898 14.3227 15.6966C14.5166 15.5037 14.6238 15.244 14.6238 14.975V4.59303H15.534C15.7914 4.59303 16 4.38949 16 4.13841C16 3.88733 15.7914 3.68379 15.534 3.68379H14.1578H12.5616V2.79661C12.5616 2.33468 12.3927 1.88327 12.0793 1.54356C12.0145 1.20226 11.5763 1 11.1075 1H7.14347Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionModal;
