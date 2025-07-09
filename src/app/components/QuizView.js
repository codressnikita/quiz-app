"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function QuizView({ questions, onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinish = () => {
    let finalScore = score;
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      finalScore = score + 1;
    }
    onFinish(finalScore, questions.length);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="z-10 flex w-full max-w-2xl flex-col items-center justify-center p-4 text-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="mb-4"
      />
      <Progress value={progress} className="mb-4 w-full" />
      <h2 className="mb-6 text-2xl font-semibold">
        {currentQuestion.question}
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {currentQuestion.options.map((option) => (
          <Button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            variant={selectedAnswer === option ? "default" : "outline"}
            className={`w-full transform rounded-lg border-2 px-6 py-4 text-lg transition hover:scale-105 ${
              selectedAnswer === option
                ? "border-brand-primary bg-brand-primary text-black"
                : "border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-8">
        {isLastQuestion ? (
          <Button
            onClick={handleFinish}
            disabled={!selectedAnswer}
            className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Finish
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="w-48 transform rounded-full bg-gray-500 px-8 py-4 text-lg font-semibold transition hover:scale-105 hover:bg-gray-600 disabled:cursor-not-allowed"
          >
            Skip / Next
          </Button>
        )}
      </div>
    </div>
  );
}
