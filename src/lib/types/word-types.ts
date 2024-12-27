// For Datamuse
export interface WordObject {
  word: string;
  tags?: 'syn' | 'prop' | 'n' | 'v';
  score?: number;
}

export interface WordListTranslationData {
  words: WordObject[];
  translations: string[];
}

export interface Language {
  id: number;
  name: string;
  isoCode: string;
}
