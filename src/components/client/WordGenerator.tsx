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
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

import { WordListTranslationObject, Language } from '~/lib/types/word-types';

import { getRelatedWords } from '~/server/languages-service/words';

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
    <div className="flex justify-start items-center h-full w-full p-5">
      <div className="flex flex-col justify-start items-center h-1/2 w-1/3 pr-4">
        <div className="flex justify-between w-full mb-10">
          <Input
            placeholder="Category"
            type="text"
            ref={wordInputRef}
            className="w-2/5"
          />

          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-2/5">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {renderLanguageOptionsList()}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between w-full mb-10">
          <Input
            placeholder="Number of results"
            type="text"
            ref={wordInputRef}
            className="w-2/5"
          />

          <div className="flex justify-between items-center w-2/5">
            <Label htmlFor="include-audio-toggle">Include audio?</Label>
            <Switch id="include-audio-toggle" />
          </div>
        </div>

        <Button
          onClick={() => fetchWordList()}
          disabled={wordListLoading}
          className="w-1/4"
        >
          {wordListLoading ? <LoadingSpinner /> : 'Generate list'}
        </Button>
      </div>

      <div className="w-2/3 h-full overflow-auto">
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

/*
category
language
number of results
include definitions?
include audio?

*/
