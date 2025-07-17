"use client";

import { Button } from "@/components/ui/button";

export default function IntroView({ onStartQuiz }) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-12 text-5xl text-brand-primary font-extrabold tracking-tight">
        Quiz Time
      </h1>
      <Button
        onClick={onStartQuiz}
        variant="outline"
        className="w-48 transform rounded-full border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition hover:scale-105 hover:bg-brand-primary hover:text-black"
      >
        Tap to Begin
      </Button>
    </div>
  );
}
