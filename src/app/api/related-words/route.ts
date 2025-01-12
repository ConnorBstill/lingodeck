import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { v2 } from '@google-cloud/translate';
const { Translate } = v2;

import { WordObject } from '~/lib/types/word-types';
import { ResponseBuilder } from '../../../lib/response-builder';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const term = req.nextUrl.searchParams.get('term');
    const languageCode = req.nextUrl.searchParams.get('lang');

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Create a list of 50 words related to "${term}" in all lowercase, with no proper nouns, formatted as a JSON array`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const relatedWords = JSON.parse(
      response.substring(
        response.indexOf('[') - 1,
        response.indexOf(']') + 1,
      ),
    );

    const translate = new Translate({
      key: process.env.GOOGLE_API_KEY,
      projectId: process.env.GOOGLE_PROJECT_ID,
    });
    const [translations] = await translate.translate(
      relatedWords,
      languageCode,
    );

    const wordList = relatedWords.map((word: any, index: number) => {
      return {
        id: index + 1,
        word,
        translation: translations[index],
      };
    });

    return new NextResponse(ResponseBuilder(wordList));
  } catch (err) {
    console.error('error in api/related-words', err);
    return new NextResponse(ResponseBuilder([]));
  }
};
