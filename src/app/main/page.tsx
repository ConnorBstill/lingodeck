import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getLanguageOptionsServer } from '~/services/languages-service/languages';

import SelectLanguageDropdown from './components/language-dropdown';
import CategoryTermInput from './components/category-term-input';
import ResultsLengthDropdown from './components/results-length-dropdown';
import AudioIncludedSwitch from './components/audio-included-switch';
import GetRelatedWordsButton from './components/get-related-words-button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import WordListTableBody from './components/wordlist-table-body';

export default async function MainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['language-options'],
    queryFn: getLanguageOptionsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-start items-center h-full w-full p-5">
        <div className="flex flex-col justify-center h-1/2 w-2/3 pr-4">
          <div className="flex flex-col justify-between w-full mb-10">
            <div className="flex flex-row w-full mb-5">
              <CategoryTermInput />

              <SelectLanguageDropdown />

              <ResultsLengthDropdown />
            </div>

            <div className="flex justify-between items-center w-1/5">
              <AudioIncludedSwitch />
            </div>
          </div>

          <GetRelatedWordsButton />
        </div>

        <div className="w-2/3 h-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Translation</TableHead>
                <TableHead>Translation</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <WordListTableBody />
            </TableBody>
          </Table>
        </div>
      </div>
    </HydrationBoundary>
  );
}
