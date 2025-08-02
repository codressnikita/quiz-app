"use client";

import { Button } from "@/components/ui/button";

export default function IntroView({ onStartQuiz }) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-12 text-7xl text-brand-primary font-extrabold tracking-tight">
        Quiz Time
      </h1>
      <Button
        onClick={onStartQuiz}
        variant="outline"
        className="text-4xl font-semibold px-12 py-8 border-2 border-brand-primary text-brand-primary bg-transparent rounded-full active:scale-95 active:bg-brand-primary active:text-black"
      >
        Tap to Begin
      </Button>
    </div>
  );
}
