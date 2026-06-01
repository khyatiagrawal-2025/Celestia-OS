import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BootScreen() {
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3000),
      setTimeout(() => setStep(4), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/gate");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="boot-screen">
      <h2>🌌 CELESTIA OS</h2>

      {step >= 1 && <p>{">"} Initializing Celestial Systems...</p>}

      {step >= 2 && <p>{">"} Loading Star Maps...</p>}

      {step >= 3 && <p>{">"} Connecting Deep Space Network...</p>}

      {step >= 4 && (
        <>
          <br />
          <p>{">"} Status: ONLINE</p>
        </>
      )}
    </div>
  );
}

export default BootScreen;