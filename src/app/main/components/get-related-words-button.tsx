'use client';

import useWordList from '~/hooks/word-generator/useWordList';

import { Button } from '~/components/ui/button';
import { LoadingSpinner } from '~/components/ui/loading-spinner';

const GetRelatedWordsButton = () => {
  const { fetchWordList, wordListLoading } = useWordList();

  const handleGetRelatedWords = () => {
    fetchWordList();
  };

  return (
    <Button
      onClick={handleGetRelatedWords}
      disabled={wordListLoading}
      className="w-1/4"
    >
      {wordListLoading ? <LoadingSpinner /> : 'Generate list'}
    </Button>
  );
};

export default GetRelatedWordsButton;
