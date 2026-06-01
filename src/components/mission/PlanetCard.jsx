function PlanetCard({ planet }) {
  return (
    <div className="planet-card">
      <h2>
        {planet.emoji} {planet.name}
      </h2>

      <p>{planet.description}</p>
    </div>
  );
}

export default PlanetCard;