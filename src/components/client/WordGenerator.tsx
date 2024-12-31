'use client';

import { useState, useRef } from 'react';
// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner';

import { handleError } from '~/lib/utils';
import { WordObject, WordListTranslationData, Language } from '~/lib/types/word-types';

interface WordGeneratorProps {
  languages: Language[];
}

const initialTableData: WordListTranslationData = {
  words: [],
  translations: [],
};

const WordGenerator = (props: WordGeneratorProps) => {
  const wordInputRef = useRef<HTMLInputElement>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [wordTableData, setWordTableData] =
    useState<WordListTranslationData>(initialTableData);

  const renderLanguageList = () => {
    const { languages } = props;

    return languages.map((language: Language) => {
      const { id, name, isoCode } = language;

      return (
        <SelectItem value={isoCode} key={`${id}${name}`}>
          {name}
        </SelectItem>
      );
    });
  };

  const getRelatedWords = async () => {
    const searchTerm = wordInputRef.current?.value;

    if (searchTerm && selectedLanguage) {
      try {
        const response = await fetch(
          `api/related-words?word=${encodeURIComponent(searchTerm)}&lang=${selectedLanguage}`,
        );
        const { data } = await response.json();

        setWordTableData(data);
      } catch (err) {
        handleError('Error fetching word list', err);
      }
    } else {
      toast('Please give the category and language that you want to create a list with');
    }
  };

  const renderWordList = () => {
    return wordTableData.words.map((item: WordObject, i: number) => {
      const translation = wordTableData.translations[i];
      const { word } = item;

      return (
        <TableRow key={`${word}${translation}`}>
          <TableCell>{word}</TableCell>
          <TableCell>{translation}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <div className="flex justify-around w-1/2 mb-10">
        <Input placeholder="Category" type="text" ref={wordInputRef} className="w-1/3" />

        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {renderLanguageList()}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={getRelatedWords} className="w-1/4">
          Get words
        </Button>
      </div>

      {/* List of words and translations */}
      <div className="w-1/2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Translation</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>{renderWordList()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export { WordGenerator };
