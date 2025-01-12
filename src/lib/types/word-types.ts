// For Datamuse
export interface WordObject {
  word: string;
  tags?: 'syn' | 'prop' | 'n' | 'v';
  score?: number;
}

export interface WordListTranslationObject {
  word: WordObject;
  translation: string;
}

export interface Language {
  id: number;
  name: string;
  isoCode: string;
}
