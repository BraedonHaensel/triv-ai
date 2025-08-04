import QuizCreation from '@/components/quiz-creation';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  searchParams: Promise<{
    topic?: string;
  }>;
};

export const metadata = {
  title: 'Quiz | TrivAI',
};

const QuizPage = async ({ searchParams }: Props) => {
  const { topic } = await searchParams;
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return <QuizCreation prefilledTopic={topic ?? ''} />;
};

export default QuizPage;
