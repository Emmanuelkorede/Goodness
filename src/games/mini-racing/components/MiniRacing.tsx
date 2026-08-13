import { GameShell } from "../../../components/game-shell/GameShell";
import { MiniRacingGame } from "./miniRacinggame";

export function MiniRacing() {
  return (
    <GameShell
      gameId="mini-racing"
      icon="🏎️"
      title="Mini Racing"
      instructions="Drag or use arrow keys to steer. Dodge the other cars — the longer you survive, the higher your score."
      rules={[
        { icon: "🏎️", label: "Survive to score" },
        { icon: "⚡", label: "Speed increases over time" },
        { icon: "💥", label: "One crash ends the run" },
      ]}
    >
      {({ onGameOver }) => <MiniRacingGame onGameOver={onGameOver} />}
    </GameShell>
  );
}