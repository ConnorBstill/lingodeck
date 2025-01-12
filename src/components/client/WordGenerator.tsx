'use client';

import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';
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
import { LoadingSpinner } from '../ui/loading-spinner';
import { toast } from 'sonner';
import { Input } from '../ui/input';

import { handleError } from '~/lib/utils';
import {
  WordObject,
  WordListTranslationObject,
  Language,
} from '~/lib/types/word-types';

import { getRelatedWords } from '~/server/languages-service/words';

interface WordGeneratorProps {
  languages: Language[];
}

const WordGenerator = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const { data: languageOptions } = useQuery<Language[]>({
    queryKey: ['language-options'],
  });

  const {
    data: wordList,
    refetch: fetchWordList,
    isRefetching: wordListLoading,
  } = useQuery<WordListTranslationObject[]>({
    queryKey: ['word-list'],
    queryFn: () =>
      getRelatedWords(
        encodeURIComponent(wordInputRef.current.value),
        selectedLanguage,
      ),
    enabled: false,
    placeholderData: [],
  });

  const renderLanguageOptionsList = () => {
    return languageOptions.map((language: Language) => {
      const { id, name, isoCode } = language;

      return (
        <SelectItem value={isoCode} key={`${id}${name}`}>
          {name}
        </SelectItem>
      );
    });
  };

  const renderWordList = (): any[] => {
    if (wordList.length) {
      return wordList.map(
        ({ id, word, translation }: WordListTranslationObject) => {
          return (
            <TableRow key={`${id}${word}`}>
              <TableCell>{word}</TableCell>
              <TableCell>{translation}</TableCell>
            </TableRow>
          );
        },
      );
    } else {
      return [];
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <div className="flex justify-around w-1/2 mb-10">
        <Input
          placeholder="Category"
          type="text"
          ref={wordInputRef}
          className="w-1/3"
        />

        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {renderLanguageOptionsList()}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={() => fetchWordList()}
          disabled={wordListLoading}
          className="w-1/4"
        >
          {wordListLoading ? <LoadingSpinner /> : 'Generate list'}
        </Button>
      </div>

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
