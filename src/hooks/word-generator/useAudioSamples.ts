import { QueryFunctionContext, useQueries } from '@tanstack/react-query';
import { AudioResponse } from '~/lib/types/audio-types';
import { WordListObject } from '~/lib/types/word-types';

const useAudioSamples = (
  fetchSpeechFromText: (
    { queryKey, signal }: QueryFunctionContext,
    languageCode: string,
  ) => Promise<AudioResponse>,
  wordList: WordListObject[],
  isAudioIncluded: boolean,
  languageCode: string,
) => {
  const audioSamples = useQueries({
    queries: wordList.map(({ id, translation }) => ({
      queryKey: ['post', translation, id],
      queryFn: (stuff: QueryFunctionContext) =>
        fetchSpeechFromText(stuff, languageCode),
      staleTime: 300 * 1000,
      enabled: !!wordList.length && isAudioIncluded,
      refetchOnWindowFocus: false,
    })),
  });

  return { audioSamples };
};

export default useAudioSamples;
