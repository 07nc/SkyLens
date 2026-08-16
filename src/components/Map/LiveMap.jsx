import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import AirplaneMarker from './AirplaneMarker';
import UserLocationMarker from './UserLocationMarker';

//mock useFlights function
import { useState } from 'react';
function useFlights() {
  const [selectedFlightId, setSelectedFlightId] = useState(-1);
  const mockFlights = [
    { id: 1, latitude: 25, longitude: 83, heading: 140 },
    { id: 2, latitude: 20.8, longitude: 72, heading: 110 },
    { id: 3, latitude: 19, longitude: 78.99, heading: 0 },
    { id: 4, latitude: 20, longitude: 85, heading: 150 }
  ];

  return {
    liveFlights: mockFlights,
    selectedFlightId,
    onSelect: setSelectedFlightId
  };
}

export default function LiveMap() {
    const indiaBounds = [
    [6.0, 68.0],  
    [37.5, 97.5] 
  ];
  const { liveFlights, selectedFlightId, onSelect } = useFlights();
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
          isSelected={selectedFlightId === flight.id} 
          onSelect={onSelect}      
        />
      ))}
      <UserLocationMarker/>
      
      </MapContainer>
    </>
  );
}