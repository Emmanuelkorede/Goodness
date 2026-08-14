import { GameShell } from "../../../components/game-shell/GameShell";
import { CatchStarsGame } from "./CatchStarsame";

export function CatchStars() {
  return (
    <GameShell
      gameId="catch-stars"
      icon="⭐"
      title="Catch the Stars"
      instructions="Drag or use arrow keys to move your basket. Catch falling stars before time runs out — avoid the bombs."
      rules={[
        { icon: "⭐", label: "Star = +1" },
        { icon: "✨", label: "Rare star = +5" },
        { icon: "💣", label: "Bomb = -3" },
      ]}
    >
      {({ onGameOver, pausedRef }) => <CatchStarsGame onGameOver={onGameOver} pausedRef={pausedRef} />}
    </GameShell>
  );
}