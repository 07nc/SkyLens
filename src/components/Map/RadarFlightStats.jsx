import { useFlights } from '../../context/FlightContext';
import airlinesData from '../../data/airlines.json';

export default function RadarFlightStats() {
  const { liveFlights } = useFlights();

  const inAir = liveFlights.filter((f) => !f.onGround).length;
  const onGround = liveFlights.filter((f) => f.onGround).length;

  const airlineCounts = {};
  liveFlights
    .filter((f) => !f.onGround)
    .forEach((f) => {
      const code = f.callsign?.slice(0, 3)?.toUpperCase();
      const match = airlinesData.find((a) => a.icao === code);
      if (match) {
        airlineCounts[match.name] = (airlineCounts[match.name] || 0) + 1;
      }
    });

  let topBrand = 'Unknown';
  let maxFlights = 0;
  for (const [brand, count] of Object.entries(airlineCounts)) {
    if (count > maxFlights) {
      topBrand = brand;
      maxFlights = count;
    }
  }

  return (
    <div className="radar-stats-box">
      <div className="radar-stat-item">
        <span className="stat-label">In Air:</span>
        <span className="stat-val">{inAir}</span>
      </div>

      <div className="radar-stat-divider" />

      <div className="radar-stat-item">
        <span className="stat-label">On Ground:</span>
        <span className="stat-val">{onGround}</span>
      </div>

      <div className="radar-stat-divider" />

      <div className="radar-stat-item">
        <span className="stat-label">Max in Air:</span>
        <span className="stat-val highlight">{topBrand} ({maxFlights})</span>
      </div>
    </div>
  );
}
