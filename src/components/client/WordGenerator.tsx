'use client';

import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { LoadingSpinner } from '../ui/loading-spinner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { Language, WordListObject } from '~/lib/types/word-types';

import { fetchSpeechFromText } from '~/services/speech-service';
import { fetchRelatedWords } from '../../services/languages-service/words';
import useWordList from '~/hooks/word-generator/useWordList';
import useAudioSamples from '~/hooks/word-generator/useAudioSamples';

const WordGenerator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isAudioIncluded, setIsAudioIncluded] = useState(false);

  const wordInputRef = useRef<HTMLInputElement>(null);

  const { wordList, fetchWordList, wordListLoading } = useWordList(
    fetchRelatedWords,
    wordInputRef,
    selectedLanguage,
  );

  const { audioSamples } = useAudioSamples(
    fetchSpeechFromText,
    wordList,
    isAudioIncluded,
    selectedLanguage,
  );

  const { data: languageOptions } = useQuery<Language[]>({
    queryKey: ['language-options'],
  });

  const handleGetRelatedWords = () => {
    fetchWordList();
  };

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

  const renderAudioPlayer = (index: number) => {
    const audioResponse = audioSamples[index].data;

    if (wordList.length && isAudioIncluded && audioResponse) {
      const audioBlob = new Blob(
        [new Uint8Array(audioResponse.data.audio.data).buffer],
        { type: 'audio/mp3' },
      );
      const url = URL.createObjectURL(audioBlob);

      return (
        <TableCell>
          <audio src={url} controls></audio>
        </TableCell>
      );
    } else if (wordList.length && isAudioIncluded && !audioResponse) {
      return (
        <TableCell>
          <LoadingSpinner />
        </TableCell>
      );
    }
  };

  const renderWordList = () => {
    return wordList.map(({ id, word, translation }: WordListObject, i) => {
      return (
        <TableRow key={`${id}${word}`}>
          <TableCell>{word}</TableCell>
          <TableCell>{translation}</TableCell>
          {renderAudioPlayer(i)}
        </TableRow>
      );
    });
  };

  const renderTable = () => {
    if (wordList.length) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Translation</TableHead>
              {isAudioIncluded ? <TableHead>Translation</TableHead> : <></>}
            </TableRow>
          </TableHeader>

          <TableBody>{renderWordList()}</TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-full p-5">
      <div className="flex flex-col justify-center h-1/2 w-2/3 pr-4">
        <div className="flex flex-col justify-between w-full mb-10">
          <div className="flex flex-row w-full mb-5">
            <Input placeholder="Category" type="text" ref={wordInputRef} />

            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="mx-5">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {renderLanguageOptionsList()}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input placeholder="Number of results" type="text" />
          </div>

          <div className="flex justify-between items-center w-1/5">
            <Label htmlFor="include-audio-toggle">Include audio?</Label>
            <Switch
              onCheckedChange={setIsAudioIncluded}
              id="include-audio-toggle"
            />
          </div>
        </div>

        <Button
          onClick={handleGetRelatedWords}
          disabled={wordListLoading}
          className="w-1/4"
        >
          {wordListLoading ? <LoadingSpinner /> : 'Generate list'}
        </Button>
      </div>

      <div className="w-2/3 h-full overflow-auto">{renderTable()}</div>
    </div>
  );
};

export { WordGenerator };
