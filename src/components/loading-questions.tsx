'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { shuffledArray } from '@/lib/utils';
import { useIsDarkMode } from '@/contexts/is-dark-mode';

type Props = { finished: boolean };

const MESSAGES = [
  'Generating questions...',
  'Scanning the archives...',
  'Loading components...',
  'Processing requests...',
  'Accessing the database...',
  'Fetching resources...',
];

const PROGRESS_CAP = 97;

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const isDarkMode = useIsDarkMode();

  const shuffledMessages = useMemo(() => shuffledArray(MESSAGES), []);

  useEffect(() => {
    const stepSize = 101 / shuffledMessages.length;
    const newIndex = Math.floor(progress / stepSize);
    setMessageIndex(newIndex);
  }, [progress, shuffledMessages]);

  const getIncrement = (progress: number) => {
    if (progress >= PROGRESS_CAP) return 0;
    if (progress >= 85) return 0.1;
    if (progress >= 80) return 0.2;
    if (progress < 3) return 0.5;

    const rand = Math.random();
    if (rand < 0.1) return 4;
    if (rand < 0.5) return 2;

    return 0.5;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (finished) return 100;
        const increment = getIncrement(prevProgress);
        return Math.min(prevProgress + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="absolute top-1/2 left-1/2 flex w-[70vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[60vw]">
      <Image
        src={isDarkMode ? '/loading-bulb-dark.gif' : '/loading-bulb-light.gif'}
        unoptimized
        width={400}
        height={400}
        alt="loading animation"
      />
      <Progress value={progress} className="mt-4 w-full" />
      <h1 className="mt-2 text-xl">{shuffledMessages[messageIndex]}</h1>
    </div>
  );
};

export default LoadingQuestions;
