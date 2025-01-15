import { Mutex } from 'async-mutex';

import { handleError } from '~/lib/utils';

import { AudioResponse } from '~/lib/types/audio-types';

const ttsMutex = new Mutex();

export const fetchSpeechFromText = async ({
  queryKey,
  signal,
}: any): Promise<AudioResponse> => {
  try {
    const [, term] = queryKey;

    const response = await ttsMutex.runExclusive(async () => {
      return await fetch(
        `api/text-to-speech?term=${encodeURIComponent(term)}`,
        { signal },
      );
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get speech sample for: ${term} \n ${response.statusText} ${response.status}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (err) {
    handleError('Error fetching speech sample', err);
  }
};
