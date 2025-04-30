import { NextRequest, NextResponse } from 'next/server';
import {
  fetchDirections,
  fetchDriveTimes,
  fetchNearByPlaces,
} from '@/utils/fetchGoogleApi';
import { getPlaceType } from '@/utils/getPlaceType';
import { getRandomColor } from '@/utils/getRandomColor';

const getSimilarColor = (color: string): string => {
  var p = 1,
    temp,
    random = Math.random(),
    result = '#';

  while (p < color.length) {
    temp = parseInt(color.slice(p, (p += 2)), 16);
    temp += Math.floor((255 - temp) * random - 30);
    result += temp.toString(16).padStart(2, '0');
  }
  return result;
};

export async function POST(req: NextRequest) {
  const { address, radius, placeTypes } = await req.json();

  const placesArray = await Promise.all(
    placeTypes.map(async (placeType: string) => {
      try {
        const placesNearBy = await fetchNearByPlaces(
          address,
          radius * 1609.34,
          placeType,
        );
        const destinations = placesNearBy.map(
          (place) => place.geometry.location,
        );
        // const randomColor = getRandomColor();
        const driveTimes = await fetchDriveTimes([address], destinations);

        const placesWithDriveTimes = placesNearBy.map((place, index) => ({
          ...place,
          distance: driveTimes[index].distance / 1609.34,
          duration: driveTimes[index].duration,
        }));

        placesWithDriveTimes.sort((a, b) => a.duration! - b.duration!);

        let places = placesWithDriveTimes.slice(0, 3);

        for (let i = 0; i < places.length; i++) {
          // const strokeColor = getSimilarColor(randomColor);
          // const randomColor = getRandomColor();
          places[i].route = await fetchDirections(
            address,
            places[i].geometry.location,
          );
          places[i].strokeColor = "#000";
        }
        return {
          placeType: getPlaceType(placeType),
          places,
        };
      } catch (err) {
        console.log(err);
        return { placeType: getPlaceType(placeType), places: [] };
      }
    }),
  );

  return NextResponse.json(placesArray);
}
