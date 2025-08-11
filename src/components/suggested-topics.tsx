'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { TOPICS } from '@/lib/topics';
import { shuffledArray } from '@/lib/utils';

const SuggestedTopics = () => {
  const router = useRouter();

  const [shuffledTopics, setShuffledTopics] = useState<string[]>([]);

  useEffect(() => {
    setShuffledTopics(shuffledArray(TOPICS));
  }, []);

  return (
    <div className="grid grid-cols-3 justify-center gap-3 sm:grid-cols-3 [@media(max-width:460px)]:grid-cols-2 [@media(min-width:1050px)]:grid-cols-4 [@media(min-width:630px)_and_(max-width:760px)]:grid-cols-4">
      {shuffledTopics.map((topic, id) => (
        <Button
          key={`${topic}-${id}`}
          className="cursor-pointer [@media(max-width:380px)]:text-xs [@media(min-width:760px)_and_(max-width:900px)]:text-xs"
          onClick={() => {
            router.push(`/create?topic=${encodeURIComponent(topic)}`);
          }}
        >
          {topic}
        </Button>
      ))}
    </div>
  );
};

export default SuggestedTopics;
