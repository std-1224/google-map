import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Map, { Layer, Marker, Source } from 'react-map-gl';
import { Icon } from '@iconify/react';
import polyline from '@mapbox/polyline';
import cx from 'classnames';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GOOGLE_MAPS_API_KEY, MAPBOX_TOKEN } from '@/config/env';
import { usCenter } from '@/data/location';
import useAppSelector from '@/hooks/useAppSelector';

interface Props {
  className?: string;
}

const MapComponent: React.FC<Props> = ({ className }) => {
  const { center, zoom, placesArray, selectedPlaceId } = useAppSelector(
    (state) => state.map,
  );

  const [polyLines, setPolyLines] = useState<any[]>([]);
  const [viewState, setViewState] = useState({
    latitude: center.lat,
    longitude: center.lng,
    zoom: zoom,
  });

  const decodePolyline = (encoded: string) => {
    return polyline.decode(encoded).map(([lat, lng]) => ({ lat, lng }));
  };

  useEffect(() => {
    const decodedPolyLines = placesArray
      .map((places) =>
        places.places.map((place) => ({
          place_id: place.place_id,
          path: decodePolyline(place.route),
          strokeColor: place.strokeColor,
        })),
      )
      .flat();
    setPolyLines(decodedPolyLines);
  }, [placesArray]);

  useEffect(() => {
    setViewState({
      latitude: center.lat,
      longitude: center.lng,
      zoom: zoom,
    });
  }, [center, zoom]);

  // Memoize markers to prevent re-renders
  const markers = useMemo(
    () =>
      placesArray.map((places) =>
        places.places.map((place) => {
          const lat =
            typeof place.geometry?.location?.lat === 'function'
              ? place.geometry.location.lat()
              : place.geometry?.location?.lat;
          const lng =
            typeof place.geometry?.location?.lng === 'function'
              ? place.geometry.location.lng()
              : place.geometry?.location?.lng;

          if (lat === undefined || lng === undefined) {
            console.warn(`Missing coordinates for place: ${place.name}`);
            return null;
          }

          return (
            <Marker
              key={place.place_id}
              longitude={lng}
              latitude={lat}
              anchor='center'
            >
              <div
                className={
                  selectedPlaceId === place.place_id
                    ? 'z-[100] flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md'
                    : 'z-[1] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md'
                }
                style={{ transform: 'translate(-50%, -50%)' }} // Centering adjustment
              >
                <Image
                  src={
                    place.photos?.[0]?.photo_reference
                      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${80}&photoreference=${place.photos?.[0]?.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
                      : '/images/image-placeholder.jpg'
                  }
                  alt={place.name}
                  width={80}
                  height={80}
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
            </Marker>
          );
        }),
      ),
    [placesArray, selectedPlaceId],
  );

  return (
    <div className={cx('', className)}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Center Marker - Home */}
        {center !== usCenter ? (
          <Marker longitude={center.lng} latitude={center.lat} anchor='center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500'>
              <Icon icon='fa:home' className='text-sm' />
            </div>
          </Marker>
        ) : (
          ''
        )}

        {/* Polyline Layer */}
        {polyLines.map((polyLine, i) => (
          <Source
            key={i}
            type='geojson'
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: polyLine.path.map((point: any) => [
                  point.lng,
                  point.lat,
                ]),
              },
            }}
          >
            <Layer
              id={`line-${i}`}
              type='line'
              paint={{
                'line-color': polyLine.strokeColor,
                'line-width':
                  selectedPlaceId === ''
                    ? 0
                    : selectedPlaceId === polyLine.place_id
                      ? 7
                      : 0,
                'line-opacity':
                  selectedPlaceId === polyLine.place_id ? 0.8 : 0.3,
              }}
            />
          </Source>
        ))}

        {/* Place Markers */}
        {markers}
      </Map>
    </div>
  );
};

export default MapComponent;
