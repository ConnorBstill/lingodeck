import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { GoogleGenerativeAI } from '@google/generative-ai';

import { WordObject } from '~/lib/types/word-types';
import { ResponseBuilder } from '../../../lib/response-builder';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const term = req.nextUrl.searchParams.get('term');
    const language = req.nextUrl.searchParams.get('lang');

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Create a list of 50 words related to "${term}" in all lowercase, with no proper nouns, along with their translations in ${language}, formatted as asn array of JSON objects with the properties 'word' for the word and 'translation' for the word's translation, as well as a property called 'id' that is equal to the object's index + 1.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const wordList = JSON.parse(
      response.substring(
        response.indexOf('[') - 1,
        response.indexOf(']') + 1,
      ),
    );

    return new NextResponse(ResponseBuilder(wordList));
  } catch (err) {
    console.error('error in api/related-words', err);
    return new NextResponse(
      ResponseBuilder([], 'Error fetching word list', true),
    );
  }
};
