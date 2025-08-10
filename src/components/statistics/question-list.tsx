import { GameType, Question } from '@/generated/prisma';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  gameType: GameType;
  questions: Question[];
};

const QuestionList = ({ gameType, questions }: Props) => {
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {gameType === 'open_ended' && (
            <TableHead className="w-[10px] text-right">Accuracy</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => {
            return (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {question.prompt}
                  <br />
                  <br />
                  <span className="font-semibold">{question.answer}</span>
                </TableCell>
                {questions[0].questionType === 'open_ended' ? (
                  <TableCell className={`font-semibold`}>
                    {question.userAnswer}
                  </TableCell>
                ) : (
                  <>
                    <TableCell
                      className={`${
                        question.isCorrect ? 'text-green-600' : 'text-red-600'
                      } font-semibold`}
                    >
                      {question.userAnswer}
                    </TableCell>
                    <TableCell className="text-right">
                      {question.percentageCorrect}
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
