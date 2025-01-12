import { handleError } from '~/lib/utils';

export const getRelatedWords = async (
  searchTerm: string,
  selectedLanguage: string,
) => {
  try {
    const response = await fetch(
      `api/related-words?term=${encodeURIComponent(searchTerm)}&lang=${selectedLanguage}`,
    );
    const { data } = await response.json();

    return data;
  } catch (err) {
    handleError('Error fetching word list', err);
  }
};
