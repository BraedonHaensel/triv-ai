import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  const roundedAccuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="md:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
        <Target />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">{roundedAccuracy.toString()}%</div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
