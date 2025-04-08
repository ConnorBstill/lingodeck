'use client';

import { useAtomValue } from 'jotai';

import { isAudioIncludedAtom } from '~/store/wordlist-parameters';

import useAudioSamples from '~/hooks/word-generator/useAudioSamples';
import useWordList from '~/hooks/word-generator/useWordList';

import AudioSampleButton from '~/components/common/audio-sample-button';
import { LoadingSpinner } from '~/components/ui/loading-spinner';
import { TableCell, TableRow } from '~/components/ui/table';

import { WordListObject } from '~/lib/types/word-types';

const WordListTableBody = () => {
  const isAudioIncluded = useAtomValue(isAudioIncludedAtom);

  const { wordList } = useWordList();

  const { audioSamples } = useAudioSamples(wordList);

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
          <AudioSampleButton audioSrc={url} />
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

  return wordList.map(({ id, word, translation }: WordListObject, i) => (
    <TableRow key={`${id}${word}`}>
      <TableCell>{word}</TableCell>
      <TableCell>{translation}</TableCell>
      {renderAudioPlayer(i)}
    </TableRow>
  ));
};

export default WordListTableBody;
