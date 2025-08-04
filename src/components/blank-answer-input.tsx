'use client';

import React, { useMemo } from 'react';
import keyword_extractor from 'keyword-extractor';

type Props = {
  correctAnswer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

export const BLANK = '_____';

const BlankAnswerInput = ({
  correctAnswer: correctAnswer,
  setBlankAnswer,
}: Props) => {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(correctAnswer, {
      language: 'english',
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [correctAnswer]);

  const answerWithBlanks = useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replaceAll(keyword, BLANK);
    }, correctAnswer);
    setBlankAnswer(answerWithBlanks);
    return answerWithBlanks;
  }, [keywords, correctAnswer, setBlankAnswer]);

  return (
    <div className="mt-4 flex w-full justify-start">
      <h1 className="text-xl font-semibold">
        {answerWithBlanks.split(BLANK).map((part, index) => {
          return (
            <>
              {part}
              {index !== answerWithBlanks.split(BLANK).length - 1 && (
                <input
                  id="user-blank-input"
                  className="w-28 border-b-2 border-black text-center focus:border-2 focus:border-b-4 focus:outline-none dark:border-white"
                ></input>
              )}
            </>
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
