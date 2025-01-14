import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { generateTextToSpeechBuffer } from '../services/text-to-speech-service';

import { ResponseBuilder } from '../../../lib/response-builder';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const term = req.nextUrl.searchParams.get('term');

    const audioBuffer = await generateTextToSpeechBuffer(term);

    return new NextResponse(ResponseBuilder({ audio: audioBuffer }));
  } catch (err) {
    console.error('error in api/related-words', err);
    return new NextResponse(
      ResponseBuilder([], 'Error fetching word list', true),
    );
  }
};
