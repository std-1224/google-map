import { NextRequest, NextResponse } from 'next/server';
import { MAPBOX_TOKEN } from '@/config/env';
import { fetchCloseTime } from '@/utils/fetchGoogleApi';

export async function POST(req: NextRequest) {
  // const { placeId } = await req.json();
  const { categories } = await req.json();
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/category/coffee?access_token=${MAPBOX_TOKEN}&language=en&limit=5&proximity=-122.41%2C39&bbox=-124.35526789303981%2C38.41262975705166%2C-120.52250410696067%2C39.54169087094499`,
      { method: 'GET' },
    );
    const result = await res.json();
    return NextResponse.json({ data: result });
  } catch (error) {
    throw Error('Place Details Error' + error);
  }
}
