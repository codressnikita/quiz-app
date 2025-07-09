"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function QuizView({ questions, onFinish, difficulty }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(score, questions.length);
      return;
    }
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, onFinish, score, questions.length]);

  useEffect(() => {
    if (selectedAnswer === null) return;

    const timeoutId = setTimeout(() => {
      const isCorrect =
        selectedAnswer === questions[currentQuestionIndex].correct_answer;
      const newScore = isCorrect ? score + 1 : score;

      if (currentQuestionIndex < questions.length - 1) {
        setScore(newScore);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        onFinish(newScore, questions.length);
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, currentQuestionIndex, questions, onFinish, score]);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
  };

  const getButtonClass = (option) => {
    const baseClasses =
      "w-full transform rounded-lg border-2 px-6 py-4 text-lg transition justify-between items-center flex";
    if (selectedAnswer !== null) {
      const isCorrectAnswer =
        option === questions[currentQuestionIndex].correct_answer;
      if (isCorrectAnswer) {
        return `${baseClasses} animate-blink border-green-500 text-white`;
      }
      if (option === selectedAnswer) {
        return `${baseClasses} border-red-500 bg-red-500/20 text-white`;
      }
      return `${baseClasses} border-gray-600 bg-transparent text-gray-500`;
    }
    return `${baseClasses} border-brand-primary bg-transparent text-gray-300 hover:bg-brand-primary/20`;
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="z-10 flex w-full max-w-3xl flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="rounded-full bg-gray-800 px-4 py-1 text-sm font-semibold text-brand-primary">
          {difficulty}
        </div>
        <div className="flex items-center space-x-2 text-lg font-semibold text-brand-primary">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="font-mono">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
      <Progress value={progress} className="mb-4 w-full" />

      <h2 className="mb-6 text-2xl font-semibold">
        {currentQuestion.question}
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {currentQuestion.options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            disabled={selectedAnswer !== null}
            className={getButtonClass(option)}
          >
            <span className="text-left">{option}</span>
            {selectedAnswer !== null &&
              option === currentQuestion.correct_answer && (
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
          </Button>
        ))}
      </div>
    </div>
  );
}
