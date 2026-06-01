import { Link } from "react-router-dom";

function PlanetCard({ planet }) {
  return (
  <Link
    to={`/planet/${planet.name.toLowerCase()}`}
    className="planet-link"
  >
    <div className="planet-card">
      <h2>
        {planet.emoji} {planet.name}
      </h2>

      <p>{planet.description}</p>
    </div>
  </Link>
);
}

export default PlanetCard;