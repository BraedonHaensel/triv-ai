'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const CustomWordCloud = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/create?topic=${'presidents'}`);
      }}
    >
      Make this a suggested topics page instead
    </div>
  );
};

export default CustomWordCloud;
