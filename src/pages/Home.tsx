import { Greeting } from "../components/arcade/Greeting";
import { ArcadeGrid } from "../components/arcade/ArcadeGrid";
import { Footer } from "../components/arcade/Footer";
import { gameRegistry } from "../data/gameRegistry"

export function Home() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col px-4 pt-10 safe-x safe-top safe-bottom">
      <Greeting />
      <div className="mt-8">
        <ArcadeGrid games={gameRegistry} />
      </div>
      <div className="mt-6 rounded-lg border border-dashed border-border-soft px-4 py-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">More games coming soon</p>
        <p className="mt-1 text-sm text-text-muted">The arcade isn't finished yet 👀</p>
      </div>
      <Footer />
    </div>
  );
}