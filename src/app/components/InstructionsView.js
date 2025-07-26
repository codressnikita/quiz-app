"use client";

import { Button } from "@/components/ui/button";

export default function InstructionsView({ onStartQuiz }) {
  const instructions = [
    "Each question has a single correct answer.",
    "You will have a 120 seconds to complete the quiz.",
    "Your score will be calculated based on correct answers.",
    'Click "Start Quiz" when you are ready to begin.',
  ];

  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        Instructions
      </h1>
      <div className="mb-8 max-w-2xl text-lg text-gray-300">
        <p className="mb-4">Welcome to the quiz! Here are the rules:</p>
        <ul className="space-y-3 text-left">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-black">
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={onStartQuiz}
        className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition active:scale-95 active:bg-brand-primary/90"
      >
        Start Quiz
      </Button>
    </div>
  );
}
