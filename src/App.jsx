import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BootScreen from "./components/BootScreen";
import MissionControl from "./components/MissionControl";

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      {bootComplete ? (
        <MissionControl />
      ) : (
        <BootScreen />
      )}
    </>
  );
}

export default App;