import { useParams } from "react-router-dom";

function PlanetDetails() {
  const { planetName } = useParams();

  return (
    <div className="planet-details">
      <h1>
        PLANET DATABASE
      </h1>

      <h2>{planetName.toUpperCase()}</h2>

      <div className="info-box">
        <p>Status: Scannable</p>
        <p>Explorer Access: Granted</p>
        <p>Mission Database: Connected</p>
      </div>
    </div>
  );
}

export default PlanetDetails;