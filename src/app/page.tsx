import SignInButton from '@/components/sign-in-button';
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
          <CardTitle>Welcome to TrivAI!</CardTitle>
          <CardDescription>
            Are you ready to kickstart your AI-powered trivia journey? Log in
            below to get started!
          </CardDescription>
          <CardContent>
            <SignInButton text="Sign In with Google!" />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
