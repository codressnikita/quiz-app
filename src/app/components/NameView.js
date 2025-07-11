"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NameView({ onNext }) {
  const [name, setName] = useState("");

  const handleNextClick = () => {
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        Tell us your name
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mb-8 w-80 rounded-full bg-gray-800 px-6 py-4 text-center text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />

      <Button
        onClick={handleNextClick}
        variant="outline"
        disabled={!name.trim()}
        className="w-48 transform rounded-full border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition hover:scale-105 hover:bg-brand-primary hover:text-black"
      >
        Next
      </Button>
    </div>
  );
}
