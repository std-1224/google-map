import { Ref, useContext, useEffect, useRef, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import Skeleton from 'react-loading-skeleton';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useFetchPlaces from '@/hooks/useFetchPlaces';
import { setPlacesArray } from '@/redux/slices/map.slice';
import Cards from './Cards';

interface Props {
  className?: string;
}
const InterestedPlaces: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { center, filter } = useAppSelector((state) => state.map);
  const [isFetching, placesArray] = useFetchPlaces(center, filter);
  const [show, setShow] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    dispatch(setPlacesArray(placesArray));
  }, [placesArray, dispatch]);

  const handleDownload = async () => {
    const printCount: number | undefined = Math.ceil(
      Number(contentRef.current?.scrollHeight) /
        Number(contentRef.current?.clientHeight) -
        1,
    );
    let pdf = new jsPDF('p');
    for (let i = 0; i < printCount + 1; i++) {
      const canvas = await html2canvas(contentRef.current as HTMLElement, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        scale: 2,
        imageTimeout: 5000,
        width: contentRef.current?.clientWidth,
        height: contentRef.current?.clientHeight,
      });
      contentRef.current?.scrollTo(
        0,
        contentRef.current?.clientHeight * (i + 1),
      );
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth() / 2;
      const pdfHeight = (contentRef.current?.clientHeight as number) / 4;
      pdf.addImage(imgData, 'PNG', pdfWidth / 2, 2, pdfWidth, pdfHeight);
      pdf.addPage('image/png', 'p');
    }

    pdf.save('map.pdf');
  };

  return (
    <>
      {show && (
        <div
          className={cx(
            'overflow-auto sm:w-full md:w-full lg:w-full xl:w-96 2xl:w-96',
            className,
          )}
          id='place-interested'
          ref={contentRef}
        >
          <div className='flex w-full items-center justify-center gap-2 px-3 py-4 align-middle'>
            <button
              className='bg-white p-3 border-solid rounded-3xl hover:bg-red-500 hover:text-white active:bg-red-400'
              onClick={handleDownload}
            >
              <TbFileDownload size={20}/>
            </button>
            <div className='flex w-full justify-center align-middle'>
              <Icon icon='mdi:place-outline' className='text-2xl' />
              <h1 className='text-center text-[16px] font-medium  md:text-[16px] lg:text-lg xl:text-xl 2xl:text-2xl'>
                Place of Interests
              </h1>
            </div>
          </div>
          <div className='space-y-4 px-4' id='content'>
            {isFetching ? (
              <Skeleton className='h-8' count={10} />
            ) : (
              Array.isArray(placesArray) &&
              placesArray.map((places, i) => (
                <Cards
                  placeType={places.placeType}
                  places={places.places}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InterestedPlaces;
