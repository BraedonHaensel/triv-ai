'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const HotTopics = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/create?topic=${'presidents'}`);
      }}
    >
      <p className="hover: text-sm hover:cursor-pointer hover:opacity-75">
        Food
      </p>
    </div>
  );
};

export default HotTopics;
