import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import BootScreen from "./components/boot/BootScreen";
import MissionControl from "./components/mission/MissionControl";

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