import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useClickOutside from '@/hooks/useClickOutside';
import { setSearchRadius } from '@/redux/slices/map.slice';

interface Props {
  className?: string;
}

const buttonStyle =
  'flex h-10 items-center gap-2 rounded-lg border border-gray-500 px-3 w-full justify-center';

const RadiusDropDown: React.FC<Props> = ({ className }) => {
  const defaultFilter = useAppSelector((state) => state.map.filter);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(defaultFilter.radius);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [placeTypes, setPlaceTypes] = useState<string[]>(
    defaultFilter.placeTypes,
  );
  const ref = useClickOutside(() => setIsOpen(false));

  const handleChangeRadius = (value: number | number[]) => {
    setRadius(value as number);
    dispatch(setSearchRadius({ radius: radius }));
  };

  const handleApplyFilter = useCallback(() => {
    dispatch(setSearchRadius({ radius }));
    setIsOpen(false);
  }, [dispatch, radius]);

  return (
    <div
      className={cx(
        'relative flex sm:w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto',
        className,
      )}
      ref={ref}
    >
      <button
        className={
          isOpen
            ? buttonStyle + ' bg-red-500 text-white'
            : buttonStyle + ' bg-white text-black'
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon icon='lets-icons:compass ' className='text-xl' />
        <p>Radius</p>
      </button>
      <div
        className={cx(
          'absolute -bottom-2 -right-0 w-full translate-y-full rounded bg-white shadow-[0px_0px_2px_#0008] transition-all duration-300 ease-in-out sm:w-full md:w-full lg:w-[590px] xl:w-[42vw] 2xl:w-[30vw]',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div className='xl-flex-row flex items-center gap-4 p-10 sm:flex-col-reverse md:flex-col-reverse lg:flex-row 2xl:flex-row'>
          <Slider
            defaultValue={radius}
            min={0.1}
            max={20}
            step={0.1}
            marks={{ 0.1: 0.1, 5: 5, 10: 10, 15: 15, 20: 20 }}
            onChangeComplete={handleChangeRadius}
          />
          <p className='whitespace-nowrap sm:text-[12px] md:text-[15px] lg:text-sm xl:text-lg 2xl:text-lg'>
            Max Radius (miles)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RadiusDropDown;
