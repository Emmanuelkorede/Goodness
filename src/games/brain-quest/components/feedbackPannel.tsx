import { motion } from "framer-motion";
import { Button } from "../../../components/ui/Button";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import type { Question } from "../types";
import type { AnswerState } from "../hooks/useBrainquestgame";

interface FeedbackPanelProps {
  question: Question;
  answerState: AnswerState;
  isLast: boolean;
  onNext: () => void;
}

export function FeedbackPanel({ question, answerState, isLast, onNext }: FeedbackPanelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const correct = answerState === "correct";

  return (
    <motion.div
      className="mt-auto flex flex-col gap-3 rounded-t-lg border-t border-border-soft bg-surface p-5 safe-bottom"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      <p className={correct ? "font-bold text-success" : "font-bold text-danger"}>
        {correct ? "✅ Correct!" : "❌ Not quite!"}
      </p>
      {!correct && <p className="text-sm text-text-muted">The correct answer is {question.answer}.</p>}
      <p className="text-sm text-text-muted">{question.explanation}</p>
      {correct && <p className="text-sm font-semibold text-accent-soft">+10 XP</p>}
      <Button size="lg" fullWidth onClick={onNext}>
        {isLast ? "See Results" : "Next Question →"}
      </Button>
    </motion.div>
  );
}