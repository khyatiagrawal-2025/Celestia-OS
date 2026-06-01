import { Link } from "react-router-dom";

function UniverseGate() {
  return (
    <div className="universe-gate">
      <h1>ACCESS GRANTED</h1>

      <h2>WELCOME EXPLORER</h2>

      <p>The Universe Awaits...</p>

      <Link to="/dashboard">
        <button className="launch-btn">
          ENTER THE WORLD
        </button>
      </Link>
    </div>
  );
}

export default UniverseGate;