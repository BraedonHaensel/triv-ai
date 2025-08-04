'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const CustomWordCloud = (props: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/quiz?topic=${'presidents'}`);
      }}
    >
      Make this a suggested topics page instead
    </div>
  );
};

export default CustomWordCloud;
