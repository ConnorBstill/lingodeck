import { useQuery } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { WordListObject } from '~/lib/types/word-types';

const useWordList = (
  fetchRelatedWords: (
    searchTerm: string,
    selectedLanguage: string,
  ) => Promise<WordListObject[]>,
  wordInputRef: MutableRefObject<HTMLInputElement>,
  selectedLanguage: string,
) => {
  const {
    data: wordList,
    refetch: fetchWordList,
    isRefetching: wordListLoading,
  } = useQuery({
    queryKey: ['word-list'],
    queryFn: () =>
      fetchRelatedWords(wordInputRef.current.value, selectedLanguage),
    enabled: false,
    placeholderData: [],
  });

  return { wordList, fetchWordList, wordListLoading };
};

export default useWordList;
