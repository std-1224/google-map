import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';

const client = new Client({});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { message: 'Address is required' },
      { status: 400 },
    );
  }

  try {
    const response = await client.geocode({
      params: { address, key: GOOGLE_MAPS_API_KEY },
    });

    return NextResponse.json(response.data.results[0]);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
