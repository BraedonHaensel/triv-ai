import HistoryComponent from '@/components/history-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import Link from 'next/link';
import React from 'react';

const RecentActivities = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return (
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href="/"
            className="text-muted-foreground text-sm hover:underline"
          >
            Sign in to view this card.
          </Link>
        </CardContent>
      </Card>
    );
  }

  const gameCount = await prisma.game.count({
    where: { userId: session.user.id },
  });

  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
        <CardDescription>
          You have played a total of {gameCount} games.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <HistoryComponent limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
