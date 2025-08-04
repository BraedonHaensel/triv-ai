import { prisma } from '@/lib/db';
import { Clock, CopyCheck, Edit2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: { timeStarted: 'desc' },
  });
  return (
    <div className="space-y-8">
      {games.map((game) => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.gameType === 'mcq' ? (
                <CopyCheck className="mr-3" />
              ) : (
                <Edit2 className="ml-4 space-y-1" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  href={`/statistics/${game.id}`}
                  className="text-base leading-none font-medium underline"
                >
                  {game.topic}
                </Link>
                <p className="flex w-fit items-center rounded-lg bg-slate-800 px-2 py-1 text-sm text-white">
                  <Clock className="mr-1 h-4 w-4" />
                  {new Date(game.timeStarted).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  {game.gameType === 'mcq' ? 'MCQ' : 'Open Ended'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
