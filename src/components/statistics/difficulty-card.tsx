import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Axe } from 'lucide-react';

type Props = {
  difficulty: string;
};

const DifficultyCard = ({ difficulty }: Props) => {
  return (
    <Card className="md:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Difficulty</CardTitle>
        <Axe />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium capitalize">{difficulty}</div>
      </CardContent>
    </Card>
  );
};

export default DifficultyCard;
