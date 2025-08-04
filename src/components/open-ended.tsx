'use client';

import { Game, Question } from '@/generated/prisma';
import { cn, formatTimeDelta } from '@/lib/utils';
import { BarChart, ChevronRight, LoaderCircle, Timer } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { checkAnswerSchema } from '@/schemas/quiz';
import axios from 'axios';
import { toast } from 'sonner';
import { differenceInSeconds } from 'date-fns';
import { Button, buttonVariants } from '@/components/ui/button';
import BlankAnswerInput, { BLANK } from '@/components/blank-answer-input';
import Link from 'next/link';

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'question' | 'answer'>[] };
};

const OpenEnded = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [blankAnswer, setBlankAnswer] = useState('');
  const [hasEnded, setHasEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setElapsedTime(differenceInSeconds(new Date(), game.timeStarted));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [hasEnded, game.timeStarted]);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [game.questions, questionIndex]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll('#user-blank-input').forEach((input) => {
        if (input instanceof HTMLInputElement) {
          filledAnswer = filledAnswer.replace(BLANK, input.value);
          input.value = '';
        }
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post('/api/check-answer', payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast.info(
          `Your answer is ${percentageSimilar}% similar to the correct answer!`
        );
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, questionIndex, game.questions.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <div className="mt-2 rounded-md bg-green-500 px-4 font-semibold whitespace-nowrap text-white">
          You finished in {formatTimeDelta(elapsedTime)}!
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants(), 'mt-2')}
        >
          View Statistics
          <BarChart className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

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
            {formatTimeDelta(elapsedTime)}
          </div>
        </div>
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
        <BlankAnswerInput
          correctAnswer={currentQuestion.answer}
          setBlankAnswer={setBlankAnswer}
        />
        <Button className="mt-2" onClick={handleNext} disabled={isChecking}>
          {isChecking && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;
