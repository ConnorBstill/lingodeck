export interface WordListObject {
  id: number;
  word: string;
  translation: string;
  audio?: {
    data: Buffer;
  };
}

export interface Language {
  id: number;
  name: string;
  isoCode: string;
}
