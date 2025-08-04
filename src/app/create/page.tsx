import QuizCreationCard from '@/components/quiz-creation';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  searchParams: Promise<{
    topic?: string;
  }>;
};

export const metadata = {
  title: 'Create | TrivAI',
};

const QuizCreationPage = async ({ searchParams }: Props) => {
  const { topic } = await searchParams;
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <QuizCreationCard prefilledTopic={topic ?? ''} />
    </div>
  );
};

export default QuizCreationPage;
