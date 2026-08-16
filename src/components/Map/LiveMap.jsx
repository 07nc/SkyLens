import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import AirplaneMarker from './AirplaneMarker';
import UserLocationMarker from './UserLocationMarker';

import { useFlights } from '../../context/FlightContext';

export default function LiveMap() {
    const indiaBounds = [
    [6.0, 68.0],  
    [37.5, 97.5] 
  ];
  const { liveFlights, selectedFlight, setSelectedFlight } = useFlights();
  return (
    <>
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        minZoom={4}
        scrollWheelZoom={false}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        maxBounds={indiaBounds}
      >
        
        <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.jpg"/>

        {liveFlights.map((flight) => (
        <AirplaneMarker 
          key={flight.id}                 
          flight={flight} 
          isSelected={selectedFlight?.id === flight.id} 
          onSelect={(id) => {
            const flightToSelect = id === -1 ? null : liveFlights.find(f => f.id === id);
            setSelectedFlight(flightToSelect);
          }}      
        />
      ))}
      <UserLocationMarker/>
      
      </MapContainer>
    </>
  );
}