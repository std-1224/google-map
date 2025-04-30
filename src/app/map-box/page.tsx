'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
// import { Icon } from '@iconify/react/dist/iconify.js';
// import { Geocoder, SearchBox } from '@mapbox/search-js-react';
// import { SearchBoxRefType } from '@mapbox/search-js-react/dist/components/SearchBox';
// import mapboxgl, { Map } from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import AddressInput from '@/components/AddressInput';
// import FilterDropdown from '@/components/FilterDropdown';
// import InterestedPlaces from '@/components/InterestedPlaces';
// import Map from '@/components/Map';
// import Map1 from '@/components/Mapbox';
// import RadiusDropDown from '@/components/RadiusDropDown';
import { MAPBOX_TOKEN } from '@/config/env';

export default function MapBox(): React.ReactElement {
  // const [isShown, setShow] = useState<boolean>(false);
  // const [mapMarkers, setMapMarkers] = useState<Array<MarkerType> | undefined>(
  //   undefined,
  // );
  // const markers: Array<MarkerType> = [
  //   {
  //     lat: -22.845347475419814,
  //     lng: -46.94279790489432,
  //   },
  //   {
  //     lat: -22.99586615719194,
  //     lng: -47.258654838487985,
  //   },
  // ];

  // const showInterestedPlaces = () => {
  //   setShow(!isShown);
  // };

  // const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // const mapInstanceRef = useRef<Map>();
  // const searchBoxRef = useRef<SearchBoxRefType | undefined>(undefined);
  // const [mapLoaded, setMapLoaded] = useState(false);
  // const [inputValue, setInputValue] = useState('');

  // const handleChange = (d: string) => {
  //   setInputValue(d);
  // };

  // useEffect(() => {
  //   mapboxgl.accessToken = MAPBOX_TOKEN;
  //   mapInstanceRef.current = new mapboxgl.Map({
  //     container: mapContainerRef.current as HTMLElement, // container ID
  //     center: [-74.5, 40], // starting position [lng, lat]
  //     zoom: 9, // starting zoom
  //   });
  //   // mapInstanceRef.current.addControl();
  //   mapInstanceRef.current.on('load', () => {
  //     setMapLoaded(true);
  //   });
  // }, []);

  // const handleClick = (e: Event) => {
  //   fetch('/api/get-place-mapbox', { method: 'POST' });
  // };

  return (
    <>
      {/* <div className='flex h-screen'>
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
            <Map className='h-full' />
          </div>
        </div>
      </div> */}
      {/* <SearchBox
        options={{
          proximity: {
            lng: -122.431297,
            lat: 37.773972,
          },
        }}
        value={inputValue}
        onChange={handleChange}
        accessToken={MAPBOX_TOKEN}
      /> */}
      {/* <mapbox-search-box
        accessToken={MAPBOX_TOKEN}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d: string) => {
          setInputValue(d);
        }}
        marker
      /> */}
      {/* <button className='bg-blue-50' onClick={handleClick}>
        Add Category Search
      </button> */}

      {/* <div id='map-container' ref={mapContainerRef} style={{ height: 900 }} /> */}
    </>
  );
}
