import { GameShell } from "../../components/game-shell/GameShell";
import {ButterflyCollectorGame  } from "../../games/butterfly-collector/components/Butterflycollectorgame";
import { getGameAccent } from "../../data/gameRegistry";

export function ButterflyCollector() {
  return (
    <GameShell
      gameId="butterfly-collector"
      icon="🦋"
      title="Butterfly Collector"
      instructions="Tap the butterflies before they flutter away. They get faster and rarer as time runs out."
      accent={getGameAccent("butterfly-collector")}
      rules={[
        { icon: "🦋", label: "Butterfly = +1" },
        { icon: "💠", label: "Rare butterfly = +5" },
        { icon: "🌟", label: "Special butterfly = +10" },
      ]}
    >
      {({ onGameOver, pausedRef }) => <ButterflyCollectorGame onGameOver={onGameOver} pausedRef={pausedRef} />}
    </GameShell>
  );
}