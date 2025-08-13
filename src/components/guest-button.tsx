'use client';

import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const GuestButton = () => {
  return (
    <Link
      href="/dashboard"
      className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full')}
    >
      Continue as Guest
    </Link>
  );
};

export default GuestButton;
