import { Route, Routes } from "react-router";
import "./App.css";

function Placeholder({ label }: { label: string }) {
  return <div className="text-text p-6">{label}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder label="Splash" />} />
      <Route path="/arcade" element={<Placeholder label="Home / Arcade" />} />
      <Route path="/games/catch-stars" element={<Placeholder label="Catch the Stars" />} />
      <Route path="/games/mini-racing" element={<Placeholder label="Mini Racing" />} />
      <Route path="/games/butterfly-collector" element={<Placeholder label="Butterfly Collector" />} />
      <Route path="/games/balloon-pop" element={<Placeholder label="Balloon Pop" />} />
      <Route path="/games/brain-quest" element={<Placeholder label="Brain Quest" />} />
    </Routes>
  );
}

export default App;