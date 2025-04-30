import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  Place,
  PlaceData,
  PlaceIdScope,
} from '@googlemaps/google-maps-services-js';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setSelectedPlaceId } from '@/redux/slices/map.slice';
import { fetchCloseTime } from '@/utils/fetchGoogleApi';
import { chooseIcon } from './icons/icons';

interface Props {
  className?: string;
  place: Record<string, any>;
}

const PlaceCard: React.FC<Props> = ({ className, place }) => {
  const dispatch = useAppDispatch();
  const placeId = useAppSelector((state) => state.map.selectedPlaceId);
  const [placeDetails, setPlaceDetails] = useState<PlaceData>();

  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    async function fetchDetails(placeId: string) {
      const response = await fetch('/api/get-place-details', {
        method: 'POST',
        body: JSON.stringify({ placeId }),
      });
      const res = await response.json();
      setPlaceDetails(res);
    }

    fetchDetails(place.place_id);
  }, [place.place_id]);

  useEffect(() => {
    async function fetchPhoto(photoRef: string) {
      const response = await fetch('/api/get-place-photo', {
        method: 'POST',
        body: JSON.stringify({ photoRef }),
      });

      const res = await response.json();

      setImageURL(res.url);
    }

    const photoReference = place.photos?.[0]?.photo_reference;
    if (photoReference) {
      fetchPhoto(photoReference);
    }
  }, [place]);
  const getPlaceCloseTime = () => {
    const date = new Date();

    if (!!placeDetails?.opening_hours) {
      if (!placeDetails.opening_hours?.open_now)
        return { time: null, closed: true };
      const totalTime =
        placeDetails.opening_hours.weekday_text[date.getDay() - 1];
      const closeTime = totalTime.substring(
        totalTime.indexOf('–') + 1,
        totalTime.length,
      );
      return { time: closeTime, closed: false };
    }
  };
  const handleSelectCard = () => {
    dispatch(
      setSelectedPlaceId(placeId === place.place_id ? '' : place.place_id),
    );
  };
  return (
    <div
      className={cx(
        'group cursor-pointer overflow-hidden rounded border shadow-lg transition-all ease-in-out hover:border-gray-500',
        className,
        placeId === place.place_id
          ? 'border-gray-500 bg-gray-500/30'
          : 'border-gray-500/20',
      )}
      onClick={handleSelectCard}
    >
      <LazyLoadImage
        src={
          place.photos?.[0]?.photo_reference
            ? `${imageURL}`
            : '/images/image-placeholder.jpg'
        }
        // crossOrigin='anonymous'
        alt={place.name}
        wrapperClassName='!h-40 !w-full flex-shrink-0 !block overflow-hidden'
        className='!h-full !w-full !object-cover'
        delayMethod='debounce'
        effect='blur'
      />
      <div className={'space-y-2 p-2'}>
        <h4 className='text-base font-medium leading-tight'>{place.name}</h4>
        <div className='flex justify-between gap-2 align-middle'>
          <h4 className='text-base font-medium leading-tight'>
            {place.vicinity.split(',')[0]}
          </h4>
          <div className='flex gap-2'>
            <div className='shadow-yellow-400 drop-shadow-lg'>
              {chooseIcon('Star')}
            </div>
            <div>
              <p
                className={
                  placeId === place.place_id
                    ? 'font-bold text-yellow-200 drop-shadow-lg'
                    : 'font-bold text-yellow-400 drop-shadow-lg'
                }
              >
                {place.rating}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row justify-between'>
            <div className='flex'>
              {!!placeDetails && !getPlaceCloseTime()?.closed ? (
                <p className='text-blue-500'>
                  Open till {getPlaceCloseTime()?.time}
                </p>
              ) : (
                <p className='text-red-500'>Closed</p>
              )}
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <div className='flex items-center gap-1'>
              <Icon icon='mdi:map-marker-distance' />
              <p className='text-sm font-medium italic text-gray-800'>
                {place.distance.toFixed(1)} miles
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <Icon icon='mdi:car-outline' />
              <p className='text-sm font-medium italic text-gray-800'>
                {place.duration % 60 >= 20
                  ? Math.ceil(place.duration / 60) + 1
                  : Math.ceil(place.duration / 60) - 1}{' '}
                minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
