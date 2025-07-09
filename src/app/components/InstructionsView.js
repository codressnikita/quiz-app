"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function InstructionsView({ onStartQuiz }) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        Instructions
      </h1>
      <div className="mb-8 max-w-2xl text-lg text-gray-300">
        <p className="mb-4">Welcome to the quiz! Here are the rules:</p>
        <ul className="list-disc space-y-2 text-left">
          <li>Each question has a single correct answer.</li>
          <li>You will have a limited time to answer each question.</li>
          <li>Your score will be calculated based on correct answers.</li>
          <li>Click &quot;Start Quiz&quot; when you are ready to begin.</li>
        </ul>
      </div>
      <Button
        onClick={onStartQuiz}
        className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90"
      >
        Start Quiz
      </Button>
    </div>
  );
}
