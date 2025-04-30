import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import 'rc-slider/assets/index.css';
import checkOptions from '@/data/checkOptions';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useClickOutside from '@/hooks/useClickOutside';
import { setPlaceType, setSearchRadius } from '@/redux/slices/map.slice';
import ApplyButton from './Forms/ApplyButton';
import Checkbox from './Forms/Checkbox';

interface Props {
  className?: string;
}

const buttonStyle =
  'flex h-10 items-center gap-2 rounded-lg border border-gray-500 px-3 w-full justify-center ';

const FilterDropdown: React.FC<Props> = ({ className }) => {
  const defaultFilter = useAppSelector((state) => state.map.filter);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(defaultFilter.radius);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [placeTypes, setPlaceTypes] = useState<string[]>(
    defaultFilter.placeTypes,
  );

  const handleCategoryChange = (e: React.MouseEvent) => {
    setCategoryId(Number(e.currentTarget.id));
  };

  useEffect(() => {
    const prev = [...placeTypes];
    const options = checkOptions[0].options;

    if (!options) return;
    const count = options.reduce(
      (acc, cur) => acc + (prev.includes(cur.value) ? 1 : 0),
      0,
    );

    // Update placeTypes based on the number of selected options
    setPlaceTypes(
      count === 0
        ? [...prev, ...options.map((option) => option.value)]
        : prev.filter((option) => {
            return !options.some((_option) => option === _option.value);
          }),
    );
  }, [0]);

  const handleCheckOption = (
    value: string,
    hasChildren: boolean,
    index?: number,
  ) => {
    const prev = [...placeTypes];
    if (!hasChildren) {
      setPlaceTypes(
        prev.includes(value)
          ? prev.filter((option) => option !== value)
          : [...prev, value],
      );
    } else if (
      index !== undefined &&
      checkOptions[index] &&
      Array.isArray(checkOptions[index].options)
    ) {
      const options = checkOptions[index].options;

      if (!options) return;

      const count = options.reduce(
        (acc, cur) => acc + (prev.includes(cur.value) ? 1 : 0),
        0,
      );

      // Update placeTypes based on the number of selected options
      setPlaceTypes(
        count === 0
          ? [...prev, ...options.map((option) => option.value)]
          : prev.filter((option) => {
              return !options.some((_option) => option === _option.value);
            }),
      );
    }
  };

  const handleCheckChecked = (index: number) => {
    const checkOption = checkOptions[index];

    if (checkOption && Array.isArray(checkOption.options)) {
      for (const option of checkOption.options) {
        if (placeTypes.includes(option.value)) {
          return true;
        }
      }
      return false;
    } else if (checkOption) {
      return placeTypes.includes(checkOption.value);
    }

    return false;
  };

  const handleApplyFilter = useCallback(() => {
    dispatch(setPlaceType({ placeTypes: placeTypes }));
    setIsOpen(false);
  }, [dispatch, placeTypes]);

  const handleClearFilter = () => {
    setPlaceTypes([]);
    dispatch(setPlaceType({ placeTypes: [] }));
    dispatch(setSearchRadius({ radius: 10 }));
    // setIsOpen(false);
  };

  return (
    <div
      className={cx(
        'relative flex sm:w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto',
        className,
      )}
    >
      <ApplyButton
        className='block rounded-lg border bg-red-500 text-white border-gray-500/50 px-4 py-1 font-medium sm:text-[8px] md:text-[8px] lg:text-sm xl:text-lg 2xl:text-lg mr-4 transition-colors duration-300 hover:bg-red-700 active:bg-red-200 active:text-red-700'
        onApply={handleApplyFilter}
      />
      <button
        className={
          isOpen
            ? buttonStyle + ' bg-red-500 text-white'
            : buttonStyle + ' bg-white text-black'
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon icon='lets-icons:filter-big' className='text-xl' />
        <p>Places</p>
      </button>
      <div
        className={cx(
          'absolute -bottom-2 -right-0 translate-y-full rounded bg-white shadow-[0px_0px_2px_#0008] transition-all duration-300 ease-in-out sm:w-[100%] md:w-[100%] lg:w-[60vw] xl:w-[620px] 2xl:w-[620px]',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div className='px-4 py-4'>
          <div className='flex sm:flex-col sm:divide-y md:flex-col md:divide-y lg:flex-col lg:divide-y xl:flex-row xl:divide-x xl:divide-y-0 2xl:flex-row 2xl:divide-y-0'>
            <div className='flex sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap xl:flex-col 2xl:flex-col '>
              {checkOptions.map((checkOption, i) => (
                <div className='space-y-4' key={i}>
                  <button
                    key={i}
                    id={i.toString()}
                    className={
                      categoryId === i
                        ? 'w-[92%] rounded border-none bg-transparent hover:bg-gray-200' +
                          ' bg-gray-200'
                        : 'w-[92%] rounded border-none bg-transparent hover:bg-gray-200'
                    }
                    onClick={handleCategoryChange}
                  >
                    <Checkbox
                      className='m-4 sm:text-[8px] md:text-[8px] lg:text-sm xl:text-lg 2xl:text-lg'
                      label={checkOption.label}
                      value={checkOption.label}
                      checked={handleCheckChecked(i)}
                      onCheck={() =>
                        handleCheckOption(
                          checkOption.value,
                          checkOption.options?.length ? true : false,
                          i,
                        )
                      }
                      isCategory={true}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className='flex grow items-start'>
              {checkOptions.map(
                (checkOption, i) =>
                  categoryId === i && (
                    <div className='my-4 flex flex-row' key={i}>
                      {checkOption.options && (
                        <div className='grid grid-cols-2 gap-x-4 gap-y-4 pl-4'>
                          {checkOption.options.map((option, j) => (
                            <Checkbox
                              className='sm:text-[8px] md:text-[8px] lg:text-sm xl:text-lg 2xl:text-lg'
                              label={option.label}
                              key={`${i}-${j}`}
                              value={option.value}
                              checked={placeTypes.includes(option.value)}
                              onCheck={() =>
                                handleCheckOption(option.value, false)
                              }
                              isCategory={false}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
          <div className='ml-auto flex w-fit gap-4'>
            <button
              className='block rounded border border-red-500/50 px-4 py-1 text-red-500 sm:text-[8px] md:text-[8px] lg:text-sm xl:text-lg 2xl:text-lg'
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
