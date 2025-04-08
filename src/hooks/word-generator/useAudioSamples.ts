import {
  QueryFunctionContext,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import {
  isAudioIncludedAtom,
  selectedLanguageAtom,
} from '~/store/wordlist-parameters';

import { fetchSpeechFromText } from '~/services/speech-service';

import { WordListObject } from '~/lib/types/word-types';

const useAudioSamples = (wordList: WordListObject[]) => {
  const isAudioIncluded = useAtomValue(isAudioIncludedAtom);
  const languageCode = useAtomValue(selectedLanguageAtom);

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
