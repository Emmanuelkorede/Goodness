import { useMemo, useRef, useState } from "react";
import type { Question } from "../types";
import { questionBank } from "../questions";
import { buildSession, xpForCorrect } from "../logic";

const SESSION_LENGTH = 8;

export type AnswerState = "unanswered" | "correct" | "incorrect";

export function useBrainQuestGame(onGameOver: (score: number) => void) {
  const session = useMemo<Question[]>(() => buildSession(questionBank, SESSION_LENGTH), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [xp, setXp] = useState(0);
  const xpRef = useRef(0);

  const current = session[index];
  const isLast = index === session.length - 1;

  const selectAnswer = (option: string) => {
    if (answerState !== "unanswered") return;
    const correct = option === current.answer;
    setSelected(option);
    setAnswerState(correct ? "correct" : "incorrect");
    if (correct) {
      xpRef.current += xpForCorrect();
      setXp(xpRef.current);
    }
  };

  const next = () => {
    if (isLast) {
      onGameOver(xpRef.current);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswerState("unanswered");
  };

  return { current, index, total: session.length, selected, answerState, xp, selectAnswer, next, isLast };
}