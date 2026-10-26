import { useState } from "react";
import FlightFinderForm from "./FlightFinderForm";
import FlightResultCard from "./FlightResultCard";
import flightsData from "../../data/flights.json";

function FlightFinderView() {
    const [flights, setFlights] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = ({ origin, destination, date }) => {
        setHasSearched(true);

        const results = flightsData.filter((flight) => {
            const matchOrigin = origin
                ? flight.origin.toUpperCase() === origin.trim().toUpperCase()
                : true;

            const matchDest = destination
                ? flight.destination.toUpperCase() === destination.trim().toUpperCase()
                : true;

            const matchDate = date ? flight.date === date : true;

            return matchOrigin && matchDest && matchDate;
        });

        setFlights(results);
    };

    return (
        <div className="flight-finder-view">
            <FlightFinderForm onSearch={handleSearch} />
            {hasSearched && <FlightResultCard flights={flights} />}
        </div>
    );
}

export default FlightFinderView;