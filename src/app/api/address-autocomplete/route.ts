import { NextRequest, NextResponse } from 'next/server';
import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';

const client = new Client({});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ message: 'Input is required' }, { status: 400 });
  }

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: GOOGLE_MAPS_API_KEY,
        types: PlaceAutocompleteType.address,
      },
    });

    return NextResponse.json(response.data.predictions);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
