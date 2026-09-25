import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import AegisDashboard from "./pages/AegisDashboard";
import AgentPage from "./pages/AgentPage";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing dark={dark} setDark={setDark} />} />
          <Route path="/dashboard" element={<AegisDashboard dark={dark} setDark={setDark} />} />
          <Route path="/agent/:name" element={<AgentPage dark={dark} setDark={setDark} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
