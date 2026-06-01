import { useParams } from "react-router-dom";

function PlanetDetails() {
  const { planetName } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>{planetName.toUpperCase()}</h1>

      <p>Planet information loading...</p>
    </div>
  );
}

export default PlanetDetails;