'use client';

import { useSetAtom } from 'jotai';

import { numberOfResultsAtom } from '~/store/wordlist-parameters';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const resultsLengthOptions = [10, 25, 50, 75, 100];

const ResultsLengthDropdown = () => {
  const setSelectedNumberOfResults = useSetAtom(numberOfResultsAtom);

  const renderResultsLengthOptionsList = () => {
    return resultsLengthOptions.map((length: number) => {
      return (
        <SelectItem value={length.toString()} key={`${length}`}>
          {length}
        </SelectItem>
      );
    });
  };

  return (
    <Select onValueChange={(val: string) => setSelectedNumberOfResults(+val)}>
      <SelectTrigger className="mx-5">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Number of results</SelectLabel>
          {renderResultsLengthOptionsList()}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ResultsLengthDropdown;
