import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  Polyline,
} from '@react-google-maps/api';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import { usCenter } from '@/data/location';
import useAppSelector from '@/hooks/useAppSelector';

interface Props {
  className?: string;
}

const Map: React.FC<Props> = ({ className }) => {
  const { center, zoom, placesArray, selectedPlaceId } = useAppSelector(
    (state) => state.map,
  );
  const [polyLines, setPolyLines] = useState<any[]>([]);

  const decodePolyline = (encoded: string) => {
    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.geometry ||
      !window.google.maps.geometry.encoding
    ) {
      throw new Error(
        'Google Maps JavaScript API library with Geometry library is required.',
      );
    }

    const path = window.google.maps.geometry.encoding
      .decodePath(encoded)
      .map((point) => ({
        lat: point.lat(),
        lng: point.lng(),
      }));
    return path;
  };

  useEffect(() => {
    const decodedPolyLines = [];
    for (let places of placesArray) {
      for (let place of places.places) {
        decodedPolyLines.push({
          place_id: place.place_id,
          path: decodePolyline(place.route),
          strokeColor: place.strokeColor,
        });
      }
    }

    setPolyLines(decodedPolyLines);
  }, [placesArray]);

  return (
    <div className={cx('', className)}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={['geometry']}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={zoom}
        >
          {center !== usCenter && (
            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              zIndex={100}
            >
              <div className='flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-500'>
                <Icon icon='fa:home' className='text-sm' />
              </div>
            </OverlayView>
          )}
          {[...polyLines].map((polyLine, i) => (
            <Polyline
              key={i}
              path={polyLine.path}
              options={{
                strokeColor: polyLine.strokeColor,
                strokeWeight:
                  selectedPlaceId === ''
                    ? 0
                    : selectedPlaceId === polyLine.place_id
                      ? 7
                      : 0,
                strokeOpacity:
                  selectedPlaceId === ''
                    ? 100
                    : selectedPlaceId === polyLine.place_id
                      ? 150
                      : 100,
                zIndex:
                  selectedPlaceId === ''
                    ? 3
                    : selectedPlaceId === polyLine.place_id
                      ? 5
                      : 3,
              }}
            />
          ))}
          {placesArray.map((places, i) => (
            <Fragment key={i}>
              {places.places.map((place) => (
                <OverlayView
                  key={`${i}-${place.place_id}`}
                  position={place.geometry.location}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    className={
                      selectedPlaceId === place.place_id
                        ? 'flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md z-[100]'
                        : 'flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md z-[1]'
                    }
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
                </OverlayView>
              ))}
            </Fragment>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
