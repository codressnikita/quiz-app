"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ResultsView({
  name,
  score,
  totalQuestions,
  onGenerateCertificate,
  onRestart,
}) {
  const [timeLeft, setTimeLeft] = useState(60);
  const incorrectAnswers = totalQuestions - score;

  useEffect(() => {
    if (timeLeft <= 0) {
      onRestart();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onRestart]);

  return (
    <div className="z-10 flex w-full max-w-2xl flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        Quiz Complete!
      </h1>
      <p className="mb-8 text-2xl text-gray-300">
        Congratulations, {name}! Here are your results.
      </p>
      <div className="mb-8 grid grid-cols-2 gap-x-8 gap-y-4 rounded-lg bg-gray-800 p-6 text-lg">
        <div className="text-left font-semibold">Questions Attempted:</div>
        <div className="text-right">{totalQuestions}</div>
        <div className="text-left font-semibold">Correct Answers:</div>
        <div className="text-right text-green-400">{score}</div>
        <div className="text-left font-semibold">Incorrect Answers:</div>
        <div className="text-right text-red-400">{incorrectAnswers}</div>
        <div className="col-span-2 my-2 border-t border-gray-700" />
        <div className="text-left text-xl font-bold">Total Score:</div>
        <div className="text-right text-xl font-bold text-brand-primary">
          {score} / {totalQuestions}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={onGenerateCertificate}
          className="w-64 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition active:scale-95 active:bg-brand-primary/90"
        >
          Generate Certificate - {timeLeft}
        </Button>
        <Button
          onClick={onRestart}
          className="w-64 transform rounded-full bg-gray-600 px-8 py-4 text-lg font-semibold transition active:scale-95 active:bg-gray-700"
        >
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}
