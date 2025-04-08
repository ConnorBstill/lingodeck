import { useQuery } from '@tanstack/react-query';

import { fetchRelatedWords } from '~/services/languages-service/words';
import { useAtomValue } from 'jotai';
import {
  listCategoryAtom,
  selectedLanguageAtom,
} from '~/store/wordlist-parameters';

const useWordList = () => {
  const category = useAtomValue(listCategoryAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);

  const {
    data: wordList,
    refetch: fetchWordList,
    isRefetching: wordListLoading,
  } = useQuery({
    queryKey: ['word-list'],
    queryFn: () => fetchRelatedWords(category, selectedLanguage),
    enabled: false,
    placeholderData: [],
  });

  return { wordList, fetchWordList, wordListLoading };
};

export default useWordList;
