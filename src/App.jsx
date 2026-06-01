import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import PlanetDetails from "./pages/PlanetDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/planet/:planetName"
          element={<PlanetDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;