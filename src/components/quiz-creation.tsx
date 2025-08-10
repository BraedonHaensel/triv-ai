'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { quizCreationSchema } from '@/schemas/quiz';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, CopyCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingQuestions from '@/components/loading-questions';
import { toast } from 'sonner';

type Props = {
  prefilledTopic?: string;
};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreationCard = ({ prefilledTopic = '' }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const { mutate: getQuestions, isPending } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post('/api/game', {
        amount,
        topic,
        type,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: prefilledTopic ?? '',
      type: 'mcq',
    },
  });

  function onSubmit(input: Input) {
    setShowLoader(true);
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId }) => {
          setLoadingFinished(true);
          setTimeout(() => {
            if (form.getValues('type') == 'open_ended') {
              router.push(`/play/open-ended/${gameId}`);
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
        <CardDescription>Choose a topic</CardDescription>
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
                  <FormDescription>Please provide a topic</FormDescription>
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
                  <FormControl>
                    <Input
                      placeholder="Enter an amount..."
                      {...field}
                      type="number"
                      min={1}
                      max={10}
                      onChange={(e) => {
                        form.setValue('amount', parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
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
                <CopyCheck className="mr-2 h-4 w-4" />
                Multiple Choice
              </Button>
              <Separator orientation="vertical" />
              <Button
                type="button"
                className="w-1/2 rounded-none rounded-r-lg"
                onClick={() => {
                  form.setValue('type', 'open_ended');
                }}
                variant={
                  form.getValues('type') === 'open_ended'
                    ? 'default'
                    : 'secondary'
                }
              >
                <BookOpen className="mr-2 h-4 w-4" /> Open Ended
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
