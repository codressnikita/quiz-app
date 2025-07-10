"use client";

import { useState, useEffect } from "react";
import IntroView from "./components/IntroView";
import NameView from "./components/NameView";
import DifficultyView from "./components/DifficultyView";
import InstructionsView from "./components/InstructionsView";
import QuizView from "./components/QuizView";
import ResultsView from "./components/ResultsView";
import CertificateView from "./components/CertificateView";
import Image from "next/image";

export default function Page() {
  const [view, setView] = useState("certificate");
  const [name, setName] = useState("Test Name");
  const [difficulty, setDifficulty] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        setAllQuestionsData(data);
        const options = data.map((item) => ({
          level: item.level,
          set: item.set,
        }));
        setDifficultyOptions(options);
      });
  }, []);

  const handleStartQuiz = () => {
    setView("name");
  };

  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    setView("difficulty");
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(`${selectedDifficulty.level} - ${selectedDifficulty.set}`);

    const difficultyData = allQuestionsData.find(
      (item) =>
        item.level === selectedDifficulty.level &&
        item.set === selectedDifficulty.set
    );
    const filteredQuestions = difficultyData ? difficultyData.questions : [];
    setQuestions(filteredQuestions.sort(() => Math.random() - 0.5));
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
      <Image
        src="/logo.png"
        alt="Logo"
        width={view === "quiz" || view === "results" ? 300 : 400}
        height={view === "quiz" || view === "results" ? 200 : 300}
        className="mb-8"
      />
      {view === "intro" && <IntroView onStartQuiz={handleStartQuiz} />}
      {view === "name" && <NameView onNext={handleNameSubmit} />}
      {view === "difficulty" && (
        <DifficultyView
          onSelectDifficulty={handleDifficultySelect}
          difficultyOptions={difficultyOptions}
        />
      )}
      {view === "instructions" && (
        <InstructionsView onStartQuiz={handleInstructionsAcknowledge} />
      )}
      {view === "quiz" && (
        <QuizView
          questions={questions}
          onFinish={handleQuizFinish}
          difficulty={difficulty}
        />
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
