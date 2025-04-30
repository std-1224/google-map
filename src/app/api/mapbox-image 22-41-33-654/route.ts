import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { reference } = req.query;

  if (!reference || typeof reference !== 'string') {
    return res.status(400).json({ error: 'Missing photo reference' });
  }

  try {
    const imageResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      {
        responseType: 'arraybuffer',
      },
    );

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(imageResponse.data, 'binary'));
  } catch (error) {
    console.error('Error fetching image:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching image' });
  }
}
