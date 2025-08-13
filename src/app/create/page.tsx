import QuizCreationCard from '@/components/quiz-creation';
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

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <QuizCreationCard prefilledTopic={topic ?? ''} />
    </div>
  );
};

export default QuizCreationPage;
