import { NextRequest, NextResponse } from 'next/server';
import { fetchCloseTime } from '@/utils/fetchGoogleApi';

export async function POST(req: NextRequest) {
  const { placeId } = await req.json();
  try {
    const res = await fetchCloseTime(placeId);
    return NextResponse.json(res.data.result);
  } catch (error) {
    throw Error('Place Details Error' + error);
  }
}
