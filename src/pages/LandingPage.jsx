import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>CELESTIA OS</h1>

      <p className="tagline">
        The Operating System For Exploring The Universe
      </p>

      <div className="creator-card">
        <h2>Created By</h2>
        <p>Khyati Agrawal</p>
        <p>Open Source Contributor</p>
        <p>AI & Full Stack Enthusiast</p>
      </div>

      <Link to="/login">
        <button className="launch-btn">
          🚀 Launch Mission
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;