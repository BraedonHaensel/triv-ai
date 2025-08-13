'use client';

import Link from 'next/link';
import React from 'react';

const HomeButton = () => {
  return (
    <Link
      href={'/dashboard'}
      className="rounded-lg border-2 border-r-4 border-b-4 border-black px-2 py-1 hover:cursor-pointer hover:opacity-75 dark:border-white"
    >
      <p className="text-xl font-bold">TrivAI</p>
    </Link>
  );
};

export default HomeButton;
