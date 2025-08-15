'use client';

import { Game, Question } from '@/generated/prisma';
import { BarChart, Check, LoaderCircle, Timer, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import MCQCounter from '@/components/mcq-counter';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { checkAnswerSchema, endGameSchema } from '@/schemas/quiz';
import z from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { cn, formatTimeDelta } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';
import { Separator } from '@/components/ui/separator';

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'prompt' | 'options'>[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [game.questions, questionIndex]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedOptionIndex],
      };
      const response = await axios.post('/api/check-answer', payload);
      return response.data;
    },
  });

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/end-game`, payload);
      return response.data;
    },
  });

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

  const handleSelection = (optionIndex: number) => {
    if (isChecking || isAnswered) {
      return;
    }
    setSelectedOptionIndex(optionIndex);
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect, correctAnswer }) => {
        if (isCorrect) {
          setCorrectCount((prev) => prev + 1);
        } else {
          setWrongCount((prev) => prev + 1);
        }
        setCorrectAnswer(correctAnswer);
        setIsAnswered(true);
        setTimeout(
          () => {
            if (questionIndex === game.questions.length - 1) {
              endGame();
              setHasEnded(true);
              return;
            }
            setQuestionIndex((prev) => prev + 1);
            setIsAnswered(false);
            setCorrectAnswer(null);
          },
          isCorrect ? 1000 : 1500
        );
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to check answer. Please try again.');
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^[1-4]$/.test(key)) {
        handleSelection(Number(key) - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSelection]);

  if (hasEnded) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <div className="mt-2 rounded-md bg-green-500 p-3 font-semibold whitespace-nowrap text-white">
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
        <MCQCounter correctAnswers={correctCount} wrongAnswers={wrongCount} />
      </div>

      <Card className="mt-4 w-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-muted-foreground mr-5 items-center text-center">
            <div>{questionIndex + 1}</div>
            <Separator className="bg-muted-foreground my-1" />
            <div>{game.questions.length}</div>
          </CardTitle>
          <CardDescription className="text-primary flex-grow text-lg">
            {currentQuestion.prompt}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4 flex w-full flex-col items-center justify-center space-y-4">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              variant="secondary"
              className={`border-secondary hover:bg-secondary w-full border-5 py-8 hover:cursor-pointer ${
                !isAnswered && 'hover:opacity-65'
              } ${
                isChecking && index === selectedOptionIndex && 'opacity-65'
              } ${
                isAnswered &&
                (option === correctAnswer
                  ? 'border-green-400'
                  : index === selectedOptionIndex && 'border-red-400')
              }`}
              onClick={() => {
                handleSelection(index);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-start">
                  <div className="mr-5 rounded-md border p-2 px-3">
                    {index + 1}
                  </div>
                  <div className="text-start">{option}</div>
                </div>
                {index === selectedOptionIndex && isChecking && (
                  <LoaderCircle className="!h-7 !w-7 animate-spin" />
                )}
                {isAnswered &&
                  (option === correctAnswer ? (
                    <Check className="!h-7 !w-7 text-green-600" />
                  ) : (
                    index === selectedOptionIndex && (
                      <X className="!h-7 !w-7 text-red-600" />
                    )
                  ))}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MCQ;
