import { getAuthSession } from '@/lib/nextauth';
import Link from 'next/link';
import React from 'react';
import SignInButton from '@/components/sign-in-button';
import UserAccountNav from '@/components/user-account-nav';
import { ThemeToggle } from '@/components/theme-toggle';

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="flex h-full items-center justify-between gap-2">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <p className="rounded-lg border-2 border-r-4 border-b-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
          TrivAI
        </p>
      </Link>
      <div className="flex items-center">
        <ThemeToggle className="mr-3" />
        <div className="flex items-center">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
