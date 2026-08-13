import clsx from "clsx";
import type { AnswerState } from "../hooks/useBrainquestgame";

interface AnswerOptionProps {
  option: string;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  answerState: AnswerState;
  onSelect: () => void;
}

export function AnswerOption({ option, isSelected, isCorrectAnswer, answerState, onSelect }: AnswerOptionProps) {
  const revealed = answerState !== "unanswered";

  return (
    <button
      onClick={onSelect}
      disabled={revealed}
      className={clsx(
        "tap-target w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors duration-150",
        !revealed && "border-border bg-surface text-text hover:bg-surface-hover active:scale-[0.98]",
        revealed && isCorrectAnswer && "border-success bg-success/15 text-success",
        revealed && isSelected && !isCorrectAnswer && "border-danger bg-danger/15 text-danger",
        revealed && !isSelected && !isCorrectAnswer && "border-border-soft bg-surface text-text-faint"
      )}
    >
      {option}
    </button>
  );
}