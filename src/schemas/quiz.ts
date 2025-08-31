import { z } from 'zod';

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(3, { message: 'Topic must be at least 3 characters long' }),
  type: z.enum(['mcq', 'true_false']),
  amount: z.number().min(1).max(10),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

export const endGameSchema = z.object({
  gameId: z.string(),
});
