"use client";

import { Button } from "@/components/ui/button";

export default function DifficultyView({
  onSelectDifficulty,
  difficultyOptions,
}) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
        Select difficulty level
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(difficultyOptions || []).map((level) => (
          <Button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className="w-40 transform rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90"
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
}
