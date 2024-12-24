// For Datamuse
export interface WordObject {
  word: string;
  tags: 'syn' | 'prop' | 'n' | 'v'
  score?: number;
}
