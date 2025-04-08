'use client';

import { useSetAtom } from 'jotai';

import { isAudioIncludedAtom } from '~/store/wordlist-parameters';

import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

const AudioIncludedSwitch = () => {
  const setIsAudioIncluded = useSetAtom(isAudioIncludedAtom);

  return (
    <>
      <Label htmlFor="include-audio-toggle">Include audio?</Label>
      <Switch
        onCheckedChange={setIsAudioIncluded}
        id="include-audio-toggle"
      />
    </>
  );
};

export default AudioIncludedSwitch;
