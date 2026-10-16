import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function AirportMarker({ airport }) {
  const airportIcon = L.divIcon({
    html: `
      <div style="
        width: 22px;
        height: 22px;
        background: #0f172a;
        border: 1.5px solid #0284c7;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(2, 132, 199, 0.55);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#38bdf8">
          <line x1="12" y1="1" x2="12" y2="4.5" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="1.5" r="1" fill="#38bdf8"/>

          <path d="M7.5 3.5a6 6 0 0 1 9 0" fill="none" stroke="#38bdf8" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>

          <polygon points="8,4.5 16,4.5 17.5,6.5 6.5,6.5" fill="#38bdf8"/>

          <polygon points="6,7 18,7 16.5,12 7.5,12" fill="#38bdf8"/>
          <line x1="10" y1="7.2" x2="9.5" y2="11.8" stroke="#0f172a" stroke-width="0.8"/>
          <line x1="14" y1="7.2" x2="14.5" y2="11.8" stroke="#0f172a" stroke-width="0.8"/>

          <polygon points="9,12.5 15,12.5 16,21 8,21" fill="#38bdf8"/>

          <rect x="6" y="21" width="12" height="2" rx="0.5" fill="#38bdf8"/>
        </svg>
      </div>
    `,
    className: 'airport-marker-icon',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  return (
    <Marker position={[airport.lat, airport.lon]} icon={airportIcon}>
      <Popup direction="top" offset={[0, -12]} opacity={0.95}>
        <div style={{ textAlign: 'center', padding: '3px 6px' }}>
          <strong style={{ color: '#38bdf8', fontSize: '13px', letterSpacing: '0.5px' }}>{airport.iata}</strong>
          <span style={{ color: '#4a4b4eff', fontSize: '11px', display: 'block', fontWeight: '500' }}>{airport.city}</span>
          <span style={{ color: '#282a2d9d', fontSize: '10px', display: 'block' }}>{airport.name}</span>
        </div>
      </Popup>
    </Marker>
  );
}
