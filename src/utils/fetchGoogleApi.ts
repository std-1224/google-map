import {
  Client,
  PlaceData,
  PlaceDetailsResponse,
  PlaceIdScope,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import {
  PlaceDetailsRequest,
  placeDetails,
} from '@googlemaps/google-maps-services-js/dist/places/details';
import { ja } from 'date-fns/locale';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';

const client = new Client({});
export const fetchNearByPlaces = async (
  location: IGeo,
  radius: number,
  type: string,
) => {
  try {
    const response = await client.placesNearby({
      params: {
        location,
        radius,
        type,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    return response.data.results as IPlace[];
  } catch (err) {
    throw new Error('Error while fetching places nearby');
  }
};

export const fetchCloseTime = async (placeId: string) => {
  try {
    const response = await client.placeDetails({
      params: { place_id: placeId, key: GOOGLE_MAPS_API_KEY },
    } as PlaceDetailsRequest);

    return response as PlaceDetailsResponse;
  } catch (err: any) {
    throw new Error('Error while fetching places detail', err);
  }
};

export const fetchDriveTimes = async (
  origins: IGeo[],
  destinations: IGeo[],
) => {
  try {
    const response = await client.distancematrix({
      params: {
        origins,
        destinations,
        key: GOOGLE_MAPS_API_KEY,
        mode: TravelMode.driving,
      },
    });

    return response.data.rows[0].elements.map((element) => ({
      distance: element.distance.value,
      duration: element.duration.value,
    }));
  } catch (err) {
    throw new Error('Error while fetching drive times');
  }
};

export const fetchDirections = async (origin: IGeo, destination: IGeo) => {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        mode: TravelMode.driving,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    return response.data.routes[0].overview_polyline.points;
  } catch (err) {
    throw new Error('Error while fetching directions');
  }
};
