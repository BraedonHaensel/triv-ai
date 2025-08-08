import HotTopics from '@/components/hot-topics-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const HotTopicsCard = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <HotTopics />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
