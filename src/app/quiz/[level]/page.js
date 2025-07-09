import fs from "fs/promises";
import path from "path";
import QuizClient from "@/app/components/QuizClient";

export async function generateStaticParams() {
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return levels.map((level) => ({
    level: level,
  }));
}

async function getQuestions(level) {
  const filePath = path.join(process.cwd(), "public", "questions.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const allQuestionSets = JSON.parse(jsonData);

  let targetLevel = "";
  let targetSet = "";

  switch (level) {
    case "Beginner":
      targetLevel = "Easy";
      targetSet = "Final Set";
      break;
    case "Intermediate":
      targetLevel = "Moderate";
      targetSet = "First Set";
      break;
    case "Expert":
      targetLevel = "Expert";
      targetSet = "Final Set";
      break;
    default:
      targetLevel = "Easy";
      targetSet = "Final Set";
  }

  const questionSet = allQuestionSets.find(
    (set) => set.level === targetLevel && set.set === targetSet
  );

  const levelQuestions = questionSet ? questionSet.questions : [];

  const shuffled = levelQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

export default async function QuizPage({ params }) {
  const { level } = params;
  const questions = await getQuestions(level);

  return <QuizClient level={level} initialQuestions={questions} />;
}
