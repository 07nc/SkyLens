import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet';
import AirplaneMarker from './AirplaneMarker';
import UserLocationMarker from './UserLocationMarker';
import MapFilterBar from '../UI/MapFilterBar';

import { useFlights } from '../../context/FlightContext';

import airportsData from '../../data/airports.json';
import AirportMarker from './AirportMarker';


function ZoomTracker({ onZoomChange }) {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    }
  });
  return null;
}


export default function LiveMap() {
  const indiaBounds = [
    [5.0, 65.0],
    [38.5, 100.0]
  ];
  const { liveFlights, selectedFlightID, setSelectedFlightID } = useFlights();
  const [filterAirlineIcao, setFilterAirlineIcao] = useState(null);

  const [currentZoom, setCurrentZoom] = useState(5);

  const filteredFlights =
    liveFlights.filter((flight) => {
      const matchesAirline = filterAirlineIcao
        ? flight.callsign?.toUpperCase().startsWith(filterAirlineIcao.toUpperCase())
        : true;

      if (!matchesAirline) { return false; }

      //always show selected flight
      if (flight.id === selectedFlightID) {
        return true;
      }
      const alt = flight.altitude;
      if (alt === null || alt === undefined) {
        return currentZoom >= 6;
      }
      if (currentZoom <= 5) { return alt >= 8000; }
      if (currentZoom == 6) { return alt >= 5000; }
      if (currentZoom == 7) { return alt >= 2500; }
      return true;
    })

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapFilterBar
        selectedAirlineIcao={filterAirlineIcao}
        onAirlineSelect={setFilterAirlineIcao}
      />
      <MapContainer
        center={[22.5, 82.5]}
        zoom={5}
        minZoom={5}
        scrollWheelZoom={true}
        zoomSnap={1}
        zoomDelta={1}
        touchZoom={true}
        maxBoundsViscosity={0.7}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        maxBounds={indiaBounds}
      >
        <ZoomTracker onZoomChange={setCurrentZoom} />
        <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.jpg" />

        {filteredFlights.map((flight) => (
          <AirplaneMarker
            key={flight.id}
            flight={flight}
            isSelected={selectedFlightID === flight.id}
            onSelect={(id) => {
              const idToSelect = id === -1 ? null : id;
              setSelectedFlightID(idToSelect);
            }}
          />
        ))}

        {airportsData.map((airport) => (
          <AirportMarker key={airport.icao} airport={airport} />
        ))}
        <UserLocationMarker />

      </MapContainer>
    </div>
  );
}