import { useEffect, useState, useTransition } from 'react';
import { usCenter } from '@/data/location';

const useFetchPlaces = (address: IGeo, filter: IPlaceFilter) => {
  const [placesArray, setPlacesArray] = useState<
    { placeType: string; places: Record<string, any>[] }[]
  >([]);
  const [isFetching, startFetchingPlaces] = useTransition();

  useEffect(() => {
    fetchPlaces(address, filter);
  }, [address, filter]);

  const fetchPlaces = (address: IGeo, filter: IPlaceFilter) => {
    if (address == usCenter) {
      return;
    }

    if (filter.placeTypes.length === 0) {
      setPlacesArray([]);
      return;
    }



    startFetchingPlaces(async () => {
      const response = await fetch('/api/find-places', {
        method: 'POST',
        body: JSON.stringify({ address, ...filter }),
      });
      const places = await response.json();

      setPlacesArray(places);
    });
  };

  return [isFetching, placesArray];
};

export default useFetchPlaces;
