import { GameShell } from "../../../components/game-shell/GameShell";
import { BalloonPopGame } from "./Ballonpopgame";

export function BalloonPop() {
  return (
    <GameShell
      gameId="balloon-pop"
      icon="🎈"
      title="Balloon Pop"
      instructions="Pop as many balloons as you can before time runs out. Chain pops without missing to build a combo multiplier."
      rules={[
        { icon: "🎈", label: "Balloon = +1" },
        { icon: "🔵", label: "Rare balloon = +3" },
        { icon: "🌟", label: "Golden balloon = +5" },
      ]}
    >
      {({ onGameOver, pausedRef }) => <BalloonPopGame onGameOver={onGameOver} pausedRef={pausedRef} />}
    </GameShell>
  );
}