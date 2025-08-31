import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { History } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const HistoryCard = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <History size={28} strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <Link
            href="/"
            className="text-muted-foreground text-sm hover:underline"
          >
            Sign in to unlock this feature.
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href="/history" passHref>
      <Card className="hover:cursor-pointer hover:opacity-75">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <History size={28} strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            View past quiz attempts.
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HistoryCard;
