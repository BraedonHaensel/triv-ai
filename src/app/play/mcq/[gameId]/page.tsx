import MCQ from '@/components/mcq';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const MCQPage = async ({ params }: Props) => {
  const { gameId } = await params;

  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          prompt: true,
          options: true,
        },
      },
    },
  });
  if (!game || game.gameType !== 'mcq') {
    return redirect('/create');
  }
  return <MCQ game={game} />;
};

export default MCQPage;
