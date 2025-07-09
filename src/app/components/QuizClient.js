"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Award,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function QuizClient({ level, initialQuestions }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [quizState, setQuizState] = useState("instructions"); // instructions, quiz, results
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const startQuiz = () => setQuizState("quiz");

  const handleQuizCompletion = (finalAnswers) => {
    let finalScore = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer.selectedOption === questions[index].answer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setAnswers(finalAnswers);
    setQuizState("results");
  };

  const Instructions = ({ onStart }) => (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <Card className="w-full max-w-2xl bg-gray-900 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-teal-400">
            Quiz Instructions
          </CardTitle>
          <CardDescription className="text-gray-400">
            You&apos;ve selected the {level} level. Here&apos;s what you need to
            know.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-4 text-lg text-gray-300">
            <li className="flex items-start">
              <FileText className="mr-3 mt-1 h-6 w-6 text-teal-400" />
              <span>
                You will be asked <strong>10</strong> multiple-choice questions.
              </span>
            </li>
            <li className="flex items-start">
              <Clock className="mr-3 mt-1 h-6 w-6 text-teal-400" />
              <span>
                You can skip a question, but you won&apos;t be able to return to
                it.
              </span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="mr-3 mt-1 h-6 w-6 text-teal-400" />
              <span>Once you answer, your choice is final. No going back!</span>
            </li>
          </ul>
          <p className="text-center text-xl font-semibold text-white">
            Ready to test your knowledge?
          </p>
          <div className="flex justify-center pt-4">
            <Button
              onClick={onStart}
              className="transform rounded-full bg-teal-500 px-12 py-6 text-xl font-bold text-gray-900 transition hover:scale-105 hover:bg-teal-600"
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Quiz = ({ questions, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [localAnswers, setLocalAnswers] = useState([]);

    const handleNext = () => {
      const newAnswers = [
        ...localAnswers,
        {
          question: questions[currentQuestionIndex].question,
          selectedOption: selectedOption || "skipped",
          correctAnswer: questions[currentQuestionIndex].answer,
        },
      ];
      setLocalAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        onComplete(newAnswers);
      }
    };

    const handleSkip = () => {
      setSelectedOption("skipped");
      handleNext();
    };

    const handleOptionSelect = (option) => {
      if (isAnswered) return;
      setSelectedOption(option);
      setIsAnswered(true);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = (currentQuestionIndex / questions.length) * 100;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4 text-white">
        <div className="w-full max-w-3xl">
          <Progress
            value={progress}
            className="mb-4 bg-gray-700 [&>*]:bg-teal-400"
          />
          <p className="mb-2 text-lg text-teal-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <Card className="w-full bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-white">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = currentQuestion.answer === option;

                  let buttonClass =
                    "justify-start text-left h-auto whitespace-normal";
                  if (isAnswered) {
                    if (isCorrect) {
                      buttonClass +=
                        " bg-green-700 hover:bg-green-800 border-green-500";
                    } else if (isSelected && !isCorrect) {
                      buttonClass +=
                        " bg-red-700 hover:bg-red-800 border-red-500";
                    } else {
                      buttonClass += " border-gray-600 hover:bg-gray-700";
                    }
                  } else {
                    buttonClass += " border-gray-600 hover:bg-gray-700";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnswered}
                    >
                      <span className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-teal-400">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle className="ml-4 text-white" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="ml-4 text-white" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleSkip}
              disabled={isAnswered}
            >
              Skip
            </Button>
            {isAnswered && (
              <Button
                className="bg-teal-500 hover:bg-teal-600"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Results = ({ score, questions, answers }) => {
    const certificateRef = useRef(null);

    const handleDownloadCertificate = () => {
      const certificateNode = certificateRef.current;
      if (!certificateNode) return;

      const downloadButton = certificateNode.querySelector(
        "#download-button-container"
      );

      // Hide button before capture
      if (downloadButton) downloadButton.style.display = "none";

      html2canvas(certificateNode, {
        backgroundColor: "#030712", // bg-gray-950
        scale: 2, // Higher scale for better quality
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certificate.pdf");

        // Show button after capture
        if (downloadButton) downloadButton.style.display = "block";
      });
    };

    const getPerformanceMessage = () => {
      const percentage = (score / questions.length) * 100;
      if (percentage === 100) return "Flawless Victory! You're a true expert!";
      if (percentage >= 80)
        return "Excellent Work! You really know your stuff.";
      if (percentage >= 60) return "Great Job! You have a solid understanding.";
      if (percentage >= 40) return "Good Effort! Keep learning and try again.";
      return "Keep practicing! You'll get there.";
    };

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4 text-white">
        <motion.div
          className="w-full max-w-3xl text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={certificateRef}>
            <Card className="w-full bg-gray-900 border-gray-700 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                <Award className="mx-auto h-24 w-24 text-yellow-400" />
              </motion.div>
              <h1 className="mt-4 text-5xl font-bold text-teal-400">
                Quiz Complete!
              </h1>
              <p className="mt-2 text-2xl text-white">
                You scored{" "}
                <span className="font-bold text-yellow-400">{score}</span> out
                of{" "}
                <span className="font-bold text-yellow-400">
                  {questions.length}
                </span>
              </p>
              <p className="mt-4 text-xl text-gray-300">
                {getPerformanceMessage()}
              </p>

              <div id="download-button-container" className="mt-8">
                <Button
                  onClick={handleDownloadCertificate}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-8 py-4"
                >
                  Download Certificate
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-left">
            <h2 className="text-3xl font-bold text-white mb-4">
              Review Your Answers
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {answers.map((ans, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <p className="font-bold text-lg text-white">
                      {index + 1}. {ans.question}
                    </p>
                    <p
                      className={`mt-2 text-md ${
                        ans.selectedOption === ans.correctAnswer
                          ? "text-green-400"
                          : ans.selectedOption === "skipped"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      Your answer: {ans.selectedOption}
                      {ans.selectedOption !== "skipped" &&
                        ans.selectedOption !== ans.correctAnswer &&
                        ` (Correct: ${ans.correctAnswer})`}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div>
      {quizState === "instructions" && <Instructions onStart={startQuiz} />}
      {quizState === "quiz" && (
        <Quiz questions={questions} onComplete={handleQuizCompletion} />
      )}
      {quizState === "results" && (
        <Results score={score} questions={questions} answers={answers} />
      )}
    </div>
  );
}
