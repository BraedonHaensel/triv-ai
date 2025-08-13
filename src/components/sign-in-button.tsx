'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const SignInButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button disabled={pathname === '/'} onClick={() => router.push('/')}>
      Sign In
    </Button>
  );
};

export default SignInButton;

/**
 *     <Link href="/dashboard" className={buttonVariants()}>
      Sign In
    </Link>
 */
