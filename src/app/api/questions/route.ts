import { NextRequest, NextResponse } from 'next/server';
import { quizCreationSchema } from '@/schemas/quiz';
import { ZodError } from 'zod';
import {
  ApiError,
  GenerateContentResponse,
  GoogleGenAI,
  Type,
} from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
// Docs: https://ai.google.dev/gemini-api/docs/structured-output#javascript.
const ai = new GoogleGenAI({});

const getOpenEndedQuestions = async (amount: number, topic: string) => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Generate a list of easy pairs of trivia questions and answers about the topic "${topic}. Limit each question to 15 words. Answers should be around 15 words`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        minItems: amount,
        maxItems: amount,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
            },
            answer: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ['question', 'answer'],
        },
      },
    },
  });
  return response.text ? JSON.parse(response.text) : [];
};

const getMCQQuestions = async (amount: number, topic: string) => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Generate a list of easy sets of multiple choice trivia questions and answers about the topic "${topic}. Limit each question to 15 words. Provide 1 correct answer and 3 wrong options.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        minItems: amount,
        maxItems: amount,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
            },
            answer: {
              type: Type.STRING,
            },
            option1: {
              type: Type.STRING,
            },
            option2: {
              type: Type.STRING,
            },
            option3: {
              type: Type.STRING,
            },
          },
          propertyOrdering: [
            'question',
            'answer',
            'option1',
            'option2',
            'option3',
          ],
        },
      },
    },
  });
  return response.text ? JSON.parse(response.text) : [];
};

// POST /api/questions
// Insomnia example:
// POST - localhost:3000/api/questions
// {
//	"amount": 3,
//	"topic": "food",
//	"type": "mcq"
//}
export const POST = async (req: NextRequest) => {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     {
    //       error: 'You must be logged in to create a quiz',
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions;
    if (type === 'open_ended') {
      questions = await getOpenEndedQuestions(amount, topic);
    } else {
      questions = await getMCQQuestions(amount, topic);
    }
    return NextResponse.json(
      {
        questions,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Zod error:', error.issues);
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (error instanceof ApiError) {
      const message = error.message;
      try {
        const parsedError = JSON.parse(message).error;
        console.error(`GenAI API error: ${parsedError.message}`);
        return NextResponse.json(
          {
            error: 'GenAI API error',
            message: parsedError.message,
          },
          { status: parsedError.code }
        );
      } catch {
        console.error('Failed to parse GenAI API error message:', message);
        return NextResponse.json(
          {
            error: 'GenAI API error',
            message,
          },
          { status: 500 }
        );
      }
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
