import { NextRequest, NextResponse } from 'next/server';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import { fetchCloseTime } from '@/utils/fetchGoogleApi';

export async function POST(req: NextRequest) {
  const { photoRef } = await req.json();
  let response;
  try {
    // const res = await fetchCloseTime(placeId);
    response = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`,
      {
        method: 'GET',
      },
    );

    return NextResponse.json({ url: response.url });
  } catch (error) {
    throw Error('Place Details Error' + error);
  }
}
