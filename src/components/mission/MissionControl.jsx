import PlanetCard from "./PlanetCard";
import { planets } from "../../data/planets";
import SolarMap from "./SolarMap";

function MissionControl() {
  return (
    <div className="mission-control">
      <div className="hero-panel">
        <h1>CELESTIA OS</h1>

        <p>Explorer Status: ACTIVE</p>
        <p>Deep Space Network: CONNECTED</p>
        <p>Mission Readiness: 100%</p>
      </div>

      <SolarMap />

      <h2 className="section-title">
        SOLAR SYSTEM DATABASE
      </h2>

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