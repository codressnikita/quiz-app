"use client";

import { Button } from "@/components/ui/button";

export default function DifficultyView({
  onSelectDifficulty,
  difficultyOptions,
}) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-8 text-7xl font-bold tracking-tight">
        Select difficulty level
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(difficultyOptions || []).map((level) => (
          <Button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className="w-40 transform rounded-full bg-brand-primary text-2xl px-8 py-4  font-semibold text-black transition active:scale-95 active:bg-brand-primary/90"
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
}
