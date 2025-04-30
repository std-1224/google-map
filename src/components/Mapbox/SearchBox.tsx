import React, { useEffect } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';

interface SearchBoxProps {
  mapInstance: mapboxgl.Map | null;
  onSearchResult: (lng: number, lat: number) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  mapInstance,
  onSearchResult,
}) => {
  useEffect(() => {
    if (mapInstance) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl as any,
        marker: false,
        placeholder: 'Search for a location...',
      });

      mapInstance.addControl(geocoder);

      geocoder.on('result', (event: any) => {
        const [lng, lat] = event.result.geometry.coordinates;
        onSearchResult(lng, lat); // Pass the coordinates back to the MapComponent
      });

      return () => {
        mapInstance.removeControl(geocoder);
      };
    }
  }, [mapInstance, onSearchResult]);

  return null; // No need to return anything as it's integrated into the map
};

export default SearchBox;
