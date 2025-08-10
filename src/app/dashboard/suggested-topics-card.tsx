import SuggestedTopics from '@/components/suggested-topics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const SuggestedToipcsCard = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Suggested Topics</CardTitle>
        <CardDescription>Create a quiz from a suggested topic!</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full max-h-[300px] justify-center overflow-y-scroll">
        <SuggestedTopics />
      </CardContent>
    </Card>
  );
};

export default SuggestedToipcsCard;
