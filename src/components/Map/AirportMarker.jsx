import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function AirportMarker({ airport }) {
  const airportIcon = L.divIcon({
    html: `
      <div style="
        width: 22px;
        height: 22px;
        background: #180306;
        border: 1.5px solid #e11d48;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(255, 42, 85, 0.5);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff4d73">
          <line x1="12" y1="1" x2="12" y2="4.5" stroke="#ff4d73" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="1.5" r="1" fill="#ff4d73"/>

          <path d="M7.5 3.5a6 6 0 0 1 9 0" fill="none" stroke="#ff4d73" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>

          <polygon points="8,4.5 16,4.5 17.5,6.5 6.5,6.5" fill="#ff4d73"/>

          <polygon points="6,7 18,7 16.5,12 7.5,12" fill="#ff4d73"/>
          <line x1="10" y1="7.2" x2="9.5" y2="11.8" stroke="#180306" stroke-width="0.8"/>
          <line x1="14" y1="7.2" x2="14.5" y2="11.8" stroke="#180306" stroke-width="0.8"/>

          <polygon points="9,12.5 15,12.5 16,21 8,21" fill="#ff4d73"/>

          <rect x="6" y="21" width="12" height="2" rx="0.5" fill="#ff4d73"/>
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
          <strong style={{ color: '#ff2a55', fontSize: '13px', letterSpacing: '0.5px' }}>{airport.iata}</strong>
          <span style={{ color: '#242424', fontSize: '11px', display: 'block', fontWeight: '500' }}>{airport.city}</span>
          <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>{airport.name}</span>
        </div>
      </Popup>
    </Marker>
  );
}
