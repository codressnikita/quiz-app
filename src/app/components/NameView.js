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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mb-8 w-80 rounded-full bg-gray-800 px-6 py-4 text-center text-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />

      <Button
        onClick={handleNextClick}
        variant="outline"
        disabled={!name.trim()}
        className="w-48 transform rounded-full border-2 border-brand-primary px-12 py-8 text-4xl font-semibold text-brand-primary transition active:scale-95 active:bg-brand-primary active:text-black"
      >
        Next
      </Button>
    </div>
  );
}
