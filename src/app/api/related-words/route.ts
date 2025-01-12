import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { v2 } from '@google-cloud/translate';
const { Translate } = v2;

import { WordObject } from '~/lib/types/word-types';
import { ResponseBuilder } from '../../../lib/response-builder';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const word = req.nextUrl.searchParams.get('word');
    const languageCode = req.nextUrl.searchParams.get('lang');

    const relatedWordsRes = await fetch(
      `${process.env.DATAMUSE_API_URL}/words?ml=${word}`,
    );
    const relatedWords = await relatedWordsRes.json();

    const bareWordList: string[] = [];

    const words = relatedWords.filter((word: WordObject) => {
      if (word.tags && !word.tags.includes('prop')) {
        bareWordList.push(word.word);
        return true;
      }
    });

    const translate = new Translate({
      key: process.env.GOOGLE_API_KEY,
      projectId: process.env.GOOGLE_PROJECT_ID,
    });

    const [translations] = await translate.translate(bareWordList, languageCode);

    const wordList = words.map((word: string, index: number) => {
      return { word, translation: translations[index] };
    });

    return new NextResponse(ResponseBuilder(wordList));
  } catch (err) {
    console.error('error in api/related-words', err);
    return new NextResponse(ResponseBuilder(null));
  }
};
