"use client";

import { useState } from "react";
import IntroView from "./components/IntroView";
import NameView from "./components/NameView";
import DifficultyView from "./components/DifficultyView";
import InstructionsView from "./components/InstructionsView";
import QuizView from "./components/QuizView";
import ResultsView from "./components/ResultsView";
import CertificateView from "./components/CertificateView";

export default function Page() {
  const [view, setView] = useState("intro");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleStartQuiz = () => {
    setView("name");
  };

  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    setView("difficulty");
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredQuestions = data.questions.filter(
          (q) => q.difficulty === selectedDifficulty
        );
        setQuestions(filteredQuestions.sort(() => Math.random() - 0.5));
      });
    setView("instructions");
  };

  const handleInstructionsAcknowledge = () => {
    setView("quiz");
  };

  const handleQuizFinish = (finalScore, total) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setView("results");
  };

  const handleGenerateCertificate = () => {
    setView("certificate");
  };

  const handleRestart = () => {
    setView("intro");
    setName("");
    setDifficulty("");
    setScore(0);
    setTotalQuestions(0);
    setQuestions([]);
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-black text-white">
      {view === "intro" && <IntroView onStartQuiz={handleStartQuiz} />}
      {view === "name" && <NameView onNext={handleNameSubmit} />}
      {view === "difficulty" && (
        <DifficultyView onSelectDifficulty={handleDifficultySelect} />
      )}
      {view === "instructions" && (
        <InstructionsView onStartQuiz={handleInstructionsAcknowledge} />
      )}
      {view === "quiz" && (
        <QuizView questions={questions} onFinish={handleQuizFinish} />
      )}
      {view === "results" && (
        <ResultsView
          name={name}
          score={score}
          totalQuestions={totalQuestions}
          onGenerateCertificate={handleGenerateCertificate}
          onRestart={handleRestart}
        />
      )}
      {view === "certificate" && <CertificateView name={name} />}
    </main>
  );
}
