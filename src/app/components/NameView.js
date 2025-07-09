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
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        Tell us Your name
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
        disabled={!name.trim()}
        className="w-48 transform rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:bg-gray-600"
      >
        Next
      </Button>
    </div>
  );
}
