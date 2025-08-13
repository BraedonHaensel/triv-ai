import GuestButton from '@/components/guest-button';
import GoogleButton from '@/components/google-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    // User is logged in. Redirect to dashboard.
    return redirect('/dashboard');
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Welcome to TrivAI</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <GoogleButton />
          <GuestButton />
        </CardContent>
      </Card>
    </div>
  );
}
