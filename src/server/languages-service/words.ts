import { handleError } from '~/lib/utils';

export const getRelatedWords = async (searchTerm: string, selectedLanguage: string) => {
  // if (searchTerm && selectedLanguage) {
  // setWordTableData(initialTableData);

  // try {
  const response = await fetch(
    `api/related-words?word=${encodeURIComponent(searchTerm)}&lang=${selectedLanguage}`,
  );
  const { data } = await response.json();

  return data;
  // } catch (err) {
  //   handleError('Error fetching word list', err);
  // }
  // } else {
  //   toast('Please give the category and language that you want to create a list with');
  // }
};
