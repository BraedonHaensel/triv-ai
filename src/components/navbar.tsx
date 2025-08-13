import { getAuthSession } from '@/lib/nextauth';
import React from 'react';
import UserAccountNav from '@/components/user-account-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import SignInButton from './sign-in-button';
import HomeButton from './home-button';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex h-full items-center justify-between gap-3">
      <HomeButton />
      <div className="flex items-center">
        <ThemeToggle className="mr-3" />
        <div className="flex items-center">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
