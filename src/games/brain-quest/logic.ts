import type { Question, QuestionCategory } from "./types";

const XP_PER_CORRECT = 10;

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildSession(bank: Question[], count: number): Question[] {
  return shuffle(bank).slice(0, Math.min(count, bank.length));
}

export function xpForCorrect() {
  return XP_PER_CORRECT;
}

export function categoryLabel(category: QuestionCategory) {
  switch (category) {
    case "general-knowledge":
      return "🌍 General Knowledge";
    case "science":
      return "🔬 Science";
    case "mathematics":
      return "➗ Mathematics";
  }
}