import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

export const metadata = {
  title: 'Dashboard | Quizmify',
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <main className="max-w-7x1 mx-auto p-8">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight"></h2>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">

      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
    </main>
  );

  return <div>page</div>;
};

export default Dashboard;
