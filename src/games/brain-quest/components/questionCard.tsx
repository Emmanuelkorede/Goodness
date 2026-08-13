import { ProgressBar } from "../../../components/ui/progressBar";
import { Badge } from "../../../components/ui/Badge";
import { AnswerOption } from "./answerOption";
import type { Question } from "../types";
import type { AnswerState } from "../hooks/useBrainquestgame";
import { categoryLabel } from "../logic";

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selected: string | null;
  answerState: AnswerState;
  onSelect: (option: string) => void;
}

export function QuestionCard({ question, index, total, selected, answerState, onSelect }: QuestionCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pt-6 safe-x">
      <div className="flex items-center justify-between">
        <Badge tone="default">{categoryLabel(question.category)}</Badge>
        <span className="text-xs text-text-faint">
          {index + 1} / {total}
        </span>
      </div>
      <ProgressBar value={index + 1} max={total} tone="accent" />
      <h2 className="text-xl font-bold text-text-h">{question.question}</h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            isSelected={selected === option}
            isCorrectAnswer={option === question.answer}
            answerState={answerState}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}