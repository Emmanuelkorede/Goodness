import { GameShell } from "../../components/game-shell/GameShell";
import { MiniRacingGame } from "../../games/mini-racing/components/miniRacinggame";
import { getGameAccent } from "../../data/gameRegistry";

export function MiniRacing() {
  return (
    <GameShell
      gameId="mini-racing"
      icon="🏎️"
      title="Mini Racing"
      instructions="Drag or use arrow keys to steer. Dodge the other cars — the longer you survive, the higher your score."
      accent={getGameAccent("mini-racing")}
      rules={[
        { icon: "🏎️", label: "Survive to score" },
        { icon: "⚡", label: "Speed increases over time" },
        { icon: "💥", label: "One crash ends the run" },
      ]}
    >
      {({ onGameOver, pausedRef }) => <MiniRacingGame onGameOver={onGameOver} pausedRef={pausedRef} />}
    </GameShell>
  );
}