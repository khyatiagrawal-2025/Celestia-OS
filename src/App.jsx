import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import BootPage from "./pages/BootPage";
import UniverseGate from "./pages/UniverseGate";
import Dashboard from "./pages/Dashboard";
import PlanetDetails from "./pages/PlanetDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/boot" element={<BootPage />} />

        <Route path="/gate" element={<UniverseGate />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/planet/:planetName"
          element={<PlanetDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;