'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { quizCreationSchema } from '@/schemas/quiz';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookCheck, CopyCheck } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingQuestions from '@/components/loading-questions';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  prefilledTopic?: string;
};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreationCard = ({ prefilledTopic = '' }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const { mutate: getQuestions, isPending } = useMutation({
    mutationFn: async ({ amount, topic, type, difficulty }: Input) => {
      const response = await axios.post('/api/game', {
        amount,
        topic,
        type,
        difficulty,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 5,
      topic: prefilledTopic ?? '',
      type: 'mcq',
      difficulty: 'medium',
    },
  });

  function onSubmit(input: Input) {
    setShowLoader(true);
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
        difficulty: input.difficulty,
      },
      {
        onSuccess: ({ gameId }) => {
          setLoadingFinished(true);
          setTimeout(() => {
            if (form.getValues('type') == 'true_false') {
              router.push(`/play/true-false/${gameId}`);
            } else {
              router.push(`/play/mcq/${gameId}`);
            }
          }, 1000);
        },
        onError: (error) => {
          console.error(error);
          toast.error('Quiz creation failed. Please try again.');
          setShowLoader(false);
        },
      }
    );
  }

  form.watch();

  if (showLoader) {
    return <LoadingQuestions finished={loadingFinished} />;
  }

  return (
    <Card className="min-w-[380px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quiz Creator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter any topic..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 3, 5, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button
                type="button"
                className="w-1/2 rounded-none rounded-l-lg"
                onClick={() => {
                  form.setValue('type', 'mcq');
                }}
                variant={
                  form.getValues('type') === 'mcq' ? 'default' : 'secondary'
                }
              >
                <CopyCheck className="h-4 w-4" />
                Multiple Choice
              </Button>
              <Button
                type="button"
                className="w-1/2 rounded-none rounded-r-lg"
                onClick={() => {
                  form.setValue('type', 'true_false');
                }}
                variant={
                  form.getValues('type') === 'true_false'
                    ? 'default'
                    : 'secondary'
                }
              >
                <BookCheck className="h-4 w-4" />
                True or False
              </Button>
            </div>
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuizCreationCard;
