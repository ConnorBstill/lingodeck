'use client';

import { useQuery } from '@tanstack/react-query';

import { selectedLanguageAtom } from '~/store/wordlist-parameters';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Language } from '~/lib/types/word-types';
import { useAtom } from 'jotai';

const SelectLanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(
    selectedLanguageAtom,
  );

  const { data: languageOptions } = useQuery<Language[]>({
    queryKey: ['language-options'],
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

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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
  );
};

export default SelectLanguageDropdown;
