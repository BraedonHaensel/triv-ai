import TrueFalse from '@/components/true-false';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play | TrivAI',
};

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const TrueFalsePage = async ({ params }: Props) => {
  const { gameId } = await params;

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          prompt: true,
        },
      },
    },
  });
  if (!game || game.gameType !== 'true_false') {
    return redirect('/create');
  }
  return <TrueFalse game={game} />;
};

export default TrueFalsePage;
