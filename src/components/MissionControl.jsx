import PlanetCard from "./PlanetCard";
import { planets } from "../data/planets";

function MissionControl() {
  return (
    <div className="mission-control">
      <h1>MISSION CONTROL</h1>

      <div className="planet-grid">
        {planets.map((planet) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
          />
        ))}
      </div>
    </div>
  );
}

export default MissionControl;