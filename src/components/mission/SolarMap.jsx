function SolarMap() {
  return (
    <div className="solar-map">

      <div
        className="orbit"
        style={{
          width: "180px",
          height: "180px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="orbit"
        style={{
          width: "300px",
          height: "300px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="sun">
        ☀
      </div>

      <div className="planet earth">
        🌍
      </div>

      <div className="planet mars">
        🔴
      </div>

      <div className="planet saturn">
        🪐
      </div>

    </div>
  );
}

export default SolarMap;