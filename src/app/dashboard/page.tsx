import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';
import QuizMeCard from './quiz-me-card';
import HistoryCard from './history-card';
import SuggestedToipcsCard from './suggested-topics-card';
import RecentActivities from './recent-activities';

export const metadata = {
  title: 'Dashboard | TrivAI',
};

const DashboardPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-12">
        <SuggestedToipcsCard />
        <RecentActivities />
      </div>
    </>
  );
};

export default DashboardPage;
