"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function IntroView({ onStartQuiz }) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
        Quiz time
      </h1>
      <Button
        onClick={onStartQuiz}
        className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90"
      >
        Start Quiz
      </Button>
    </div>
  );
}
