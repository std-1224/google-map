'use client';

import dynamic from 'next/dynamic';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddressInput from '@/components/AddressInput';
import FilterDropdown from '@/components/FilterDropdown';
import InterestedPlaces from '@/components/InterestedPlaces';
import Map from '@/components/Map';
import RadiusDropDown from '@/components/RadiusDropDown';

const MapComponent = dynamic(() => import('@/components/Mapbox/MapboxMap'), {
  ssr: false,
});

export default function Mapbox() {
  const [isShown, setShow] = useState<boolean>(false);

  const showInterestedPlaces = () => {
    setShow(!isShown);
  };
  return (
    <>
      <div className='flex h-screen'>
        <div className="flex-2 bg-[url('/images/Sidebar/back.png')]">
          <div className='flex w-32 flex-col  sm:w-16 lg:w-20'>
            <button
              onClick={showInterestedPlaces}
              className='z-[5] flex w-full rounded bg-white px-4 py-2 font-bold text-black hover:bg-red-500 hover:text-white xl:hidden 2xl:hidden'
            >
              <Icon icon='mdi:menu' className='w-full text-2xl' />{' '}
            </button>
            <div className='z-[3] mt-40 object-scale-down '>
              <img className='' src='/images/Sidebar/Logo.png'></img>
            </div>
            <div className='z-0 object-scale-down '>
              <img
                className='absolute top-0 h-screen w-20 sm:-left-4 md:-left-4  lg:-left-0 xl:left-0 2xl:left-0'
                src='/images/Sidebar/MaskBackground.png'
              ></img>
            </div>
          </div>
        </div>
        {isShown && (
          <div className='fixed z-20 h-screen w-screen border-gray-200 bg-white xl:block 2xl:block'>
            <InterestedPlaces className={'h-screen xl:block 2xl:block'} />
            <div className='absolute right-0 top-0 rounded bg-white p-2 font-bold text-black hover:bg-red-500 hover:text-white sm:block lg:block xl:hidden 2xl:hidden'>
              <button className='p-2' onClick={() => setShow(!isShown)}>
                X
              </button>
            </div>
          </div>
        )}
        <div className='z-[3] h-screen border-gray-200 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
          <InterestedPlaces
            className={'hidden h-screen w-full xl:block 2xl:block'}
          />
        </div>
        <div className='flex h-full w-full flex-col'>
          <div className='flex w-full border-gray-200 p-3'>
            <div className='flex w-full items-center gap-4 px-4 sm:flex-col sm:items-start  md:flex-col md:items-start lg:flex-row xl:flex-row 2xl:flex-row'>
              <AddressInput className='w-full max-w-xl' />
              <FilterDropdown className='z-[4]' />
              <RadiusDropDown className='z-[3]' />
            </div>
          </div>
          <div className='h-full w-full'>
            <MapComponent className='h-full w-full' />
          </div>
        </div>
      </div>
    </>
  );
}
