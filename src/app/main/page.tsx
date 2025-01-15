import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getLanguageOptionsServer } from '~/services/languages-service/languages';

import { WordGenerator } from '~/components/client/WordGenerator';

export default async function MainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['language-options'],
    queryFn: getLanguageOptionsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WordGenerator />
    </HydrationBoundary>
  );
}
