import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, Trophy } from 'lucide-react';

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-12">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex h-3/5 flex-col items-center justify-center">
        {accuracy > 75 ? (
          <>
            <Trophy className="mb-1" stroke="gold" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="text-center">Excellent!</span>
              <span className="text-center text-sm text-slate-400">
                {'> 75% accuracy'}
              </span>
            </div>
          </>
        ) : accuracy >= 30 ? (
          <>
            <Trophy className="mb-1" stroke="silver" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-stone-400">
              <span className="text-center">Well done!</span>
              <span className="text-center text-sm text-slate-400">
                {'30-75% accuracy'}
              </span>
            </div>
          </>
        ) : (
          <>
            <Trophy className="mb-1" stroke="brown" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-800">
              <span className="text-center">Nice try!</span>
              <span className="text-center text-sm text-slate-400">
                {'< 30% accuracy'}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
