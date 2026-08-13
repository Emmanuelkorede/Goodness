import { Greeting } from "../components/arcade/Greeting";
import { ArcadeGrid } from "../components/arcade/ArcadeGrid";
import { Footer } from "../components/arcade/Footer";
import { gameRegistry } from "../data/gameRegistry";

export function Home() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col px-4 pt-8 safe-x safe-top safe-bottom">
      <Greeting />
      <div className="mt-6">
        <ArcadeGrid games={gameRegistry} />
      </div>
      <div className="mt-8 text-center text-xs font-semibold tracking-wide text-text-faint">
        MORE GAMES COMING SOON
        <p className="mt-1 text-text-muted">The arcade isn't finished yet 👀</p>
      </div>
      <Footer />
    </div>
  );
}