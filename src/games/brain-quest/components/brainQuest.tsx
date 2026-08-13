import { GameShell } from "../../../components/game-shell/GameShell";
import { BrainQuestGame } from "./brainQuestgame";

export function BrainQuest() {
  return (
    <GameShell
      gameId="brain-quest"
      icon="🧠"
      title="Brain Quest"
      instructions="Answer trivia questions across general knowledge, science, and math. Every correct answer earns XP."
      rules={[{ icon: "✅", label: "Correct answer = +10 XP" }]}
    >
      {({ onGameOver }) => <BrainQuestGame onGameOver={onGameOver} />}
    </GameShell>
  );
}