'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { LoaderCircle } from 'lucide-react';

const GoogleButton = () => {
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn('google').catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  return (
    <Button className="rounded-full" disabled={isLoading} onClick={handleLogin}>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <FcGoogle />
          <span>Continue with Google</span>
        </>
      )}
    </Button>
  );
};

export default GoogleButton;
