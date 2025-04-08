'use client';

import { useRef, memo, useCallback } from 'react';

import { Play } from 'lucide-react';
import { Button } from '../ui/button';

interface AudioSampleButtonProps {
  audioSrc: string;
}

const AudioSampleButton = memo(({ audioSrc }: AudioSampleButtonProps) => {
  const handlePlay = useCallback(() => {
    const audioRef = new Audio(audioSrc);
    console.log('audioSrc', audioSrc);
    audioRef.play();
  }, [audioSrc]);

  return (
    <Button onClick={handlePlay} variant="ghost" size="icon">
      <Play />
    </Button>
  );
});

export default AudioSampleButton;
