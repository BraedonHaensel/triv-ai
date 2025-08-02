'use client';

import { Game, Question } from '@/generated/prisma';
import { ChevronRight, Timer } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import MCQCounter from './MCQCounter';

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'options' | 'question'>[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number>(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 md:w-[80vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic heading */}
          <p>
            <span className="mr-2 text-slate-400">Topic</span>
            <span className="rounded-lg bg-slate-800 px-2 py-1 text-white">
              {game.topic}
            </span>
          </p>
          <div className="mt-3 flex self-start text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>
        <MCQCounter correctAnswers={3} wrongAnswers={4} />
      </div>

      <Card className="mt-4 w-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 divide-y divide-zinc-600/50 text-center">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4 flex w-full flex-col items-center justify-center">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              className="mb-4 w-full justify-start py-8"
              variant={selectedChoice === index ? 'default' : 'secondary'}
              onClick={() => {
                setSelectedChoice(index);
              }}
            >
              <div className="flex items-center justify-start">
                <div className="mr-5 rounded-md border p-2 px-3">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button className="mt-2">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
