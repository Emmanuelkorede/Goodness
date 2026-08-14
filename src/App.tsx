import { Route, Routes } from "react-router";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { CatchStars } from "./pages/games/CathStarsPage";
import { MiniRacing } from "./pages/games/miniRacingPage";
import { ButterflyCollector } from "./pages/games/ButterflyCollectorPage";
import { BalloonPop } from "./pages/games/BallonsPoPage";
import { BrainQuest } from "./pages/games/BrainquestPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/arcade" element={<Home />} />
      <Route path="/games/catch-stars" element={<CatchStars />} />
      <Route path="/games/mini-racing" element={<MiniRacing />} />
      <Route path="/games/butterfly-collector" element={<ButterflyCollector />} />
      <Route path="/games/balloon-pop" element={<BalloonPop />} />
      <Route path="/games/brain-quest" element={<BrainQuest />} />
    </Routes>
  );
}

export default App;