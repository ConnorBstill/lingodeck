import { WordListObject } from '~/lib/types/word-types';
import { handleError } from '~/lib/utils';

export const fetchRelatedWords = async (
  searchTerm: string,
  selectedLanguage: string,
): Promise<WordListObject[]> => {
  try {
    console.log('params', searchTerm, selectedLanguage);
    const response = await fetch(
      `api/related-words?term=${encodeURIComponent(searchTerm)}&lang=${encodeURIComponent(selectedLanguage)}`,
    );
    const { data } = await response.json();

    return data as WordListObject[];
  } catch (err) {
    handleError('Error fetching word list', err);
    return [];
  }
};
