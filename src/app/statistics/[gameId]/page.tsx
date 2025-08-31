import AccuracyCard from '@/components/statistics/accuracy-card';
import QuestionList from '@/components/statistics/question-list';
import ResultsCard from '@/components/statistics/award-card';
import TimeTakenCard from '@/components/statistics/time-taken-card';
import { buttonVariants } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { LucideLayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import DifficultyCard from '@/components/statistics/difficulty-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics | TrivAI',
};

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const StatisticsPage = async ({ params }: Props) => {
  const { gameId } = await params;

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true },
  });
  if (!game) {
    return redirect('/create');
  }

  const totalCorrect = game.questions.reduce((acc, question) => {
    return question.isCorrect ? acc + 1 : acc;
  }, 0);
  let accuracy = (totalCorrect / game.questions.length) * 100;
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className={buttonVariants()}>
            <LucideLayoutDashboard />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="xs:grid-cols-6 mt-4 grid gap-4 md:grid-cols-12">
        <ResultsCard accuracy={accuracy} />
        <AccuracyCard accuracy={accuracy} />
        <DifficultyCard difficulty={game.difficulty} />
        <TimeTakenCard
          timeStarted={game.timeStarted}
          timeEnded={game.timeEnded ?? new Date()}
        />
      </div>
      <QuestionList questions={game.questions} />
    </>
  );
};

export default StatisticsPage;
