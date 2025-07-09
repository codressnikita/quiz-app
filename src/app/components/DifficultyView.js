"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DifficultyView({ onSelectDifficulty }) {
  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
        Select Difficulty
      </h1>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button
          onClick={() => onSelectDifficulty("Beginner")}
          className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90"
        >
          Beginner
        </Button>
        <Button
          onClick={() => onSelectDifficulty("Intermediate")}
          variant="outline"
          className="w-48 transform rounded-full border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition hover:scale-105 hover:bg-brand-primary hover:text-black"
        >
          Intermediate
        </Button>
        <Button
          onClick={() => onSelectDifficulty("Expert")}
          variant="outline"
          className="w-48 transform rounded-full border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition hover:scale-105 hover:bg-brand-primary hover:text-black"
        >
          Expert
        </Button>
      </div>
    </div>
  );
}
