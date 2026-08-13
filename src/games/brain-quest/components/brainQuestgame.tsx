import { AnimatePresence } from "framer-motion";
import { QuestionCard } from "./questionCard";
import { FeedbackPanel } from "./feedbackPannel";
import { useBrainQuestGame } from "../hooks/useBrainquestgame";

interface BrainQuestGameProps {
  onGameOver: (score: number) => void;
}

export function BrainQuestGame({ onGameOver }: BrainQuestGameProps) {
  const { current, index, total, selected, answerState, xp, selectAnswer, next, isLast } =
    useBrainQuestGame(onGameOver);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-end px-4 pt-2">
        <span className="text-xs font-semibold text-accent-soft">{xp} XP</span>
      </div>
      <QuestionCard
        question={current}
        index={index}
        total={total}
        selected={selected}
        answerState={answerState}
        onSelect={selectAnswer}
      />
      <AnimatePresence>
        {answerState !== "unanswered" && (
          <FeedbackPanel question={current} answerState={answerState} isLast={isLast} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  );
}