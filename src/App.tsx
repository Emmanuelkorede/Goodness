import { Route, Routes } from "react-router";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { CatchStarsPage } from "./pages/games/CathStarsPage";
import { MiniRacingPage } from "./pages/games/miniRacingPage";
import { ButterflyCollectorPage } from "./pages/games/ButterflyCollectorPage";
import { BalloonPopPage } from "./pages/games/BallonsPoPage";
import { BrainQuestPage } from "./pages/games/BrainquestPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/arcade" element={<Home />} />
      <Route path="/games/catch-stars" element={<CatchStarsPage />} />
      <Route path="/games/mini-racing" element={<MiniRacingPage />} />
      <Route path="/games/butterfly-collector" element={<ButterflyCollectorPage />} />
      <Route path="/games/balloon-pop" element={<BalloonPopPage />} />
      <Route path="/games/brain-quest" element={<BrainQuestPage />} />
    </Routes>
  );
}

export default App;