import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import PlaceCard from './PlaceCard';
import { chooseIcon } from './icons/icons';

interface Props {
  className?: string;
  placeType: string;
  places: Record<string, any>[];
  ref?: HTMLDivElement | null;
}

const Cards: React.FC<Props> = ({ className, placeType, places, ref}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={cx('', className)}>
      <div
        className='flex cursor-pointer items-center gap-1 rounded bg-gray-200 p-4'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {chooseIcon(placeType)}
        <p className='select-none font-medium'>
          {placeType} ({places.length})
        </p>
      </div>
      <div
        className={cx(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'mt-2 grid-rows-[1fr]' : 'mt-0 grid-rows-[0fr]',
        )}
      >
        <div className={cx(isOpen? 'min-h-0 space-y-2 mb-11': 'min-h-0 space-y-2')}>
          {Array.isArray(places) &&
            places.map((place) => (
              <PlaceCard className='' place={place} key={place.place_id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
