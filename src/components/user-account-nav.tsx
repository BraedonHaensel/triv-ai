'use client';

import { User } from 'next-auth';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';

type Props = {
  user: Pick<User, 'name' | 'image' | 'email'>;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-card max-w-[min(400px,100vw)]"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex w-full flex-col space-y-1 leading-none">
            {user.name && <p className="truncate font-medium">{user.name}</p>}
            {user.email && (
              <p className="text-muted-foreground truncate text-sm">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            signOut().catch(console.error);
          }}
          className="cursor-pointer text-red-600"
        >
          Sign Out
          <LogOut className="h-4 w-4 text-inherit" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
