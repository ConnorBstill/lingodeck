// For Datamuse
export interface WordObject {
  word: string;
  tags?: 'syn' | 'prop' | 'n' | 'v';
  score?: number;
}

export interface WordListTranslationObject {
  id: number;
  word: string;
  translation: string;
}

export interface Language {
  id: number;
  name: string;
  isoCode: string;
}
