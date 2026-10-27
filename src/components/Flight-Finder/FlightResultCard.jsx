function FlightResultCard({ flights }) {
    if (!flights || flights.length === 0) {
        return (
            <div className="flight-results" style={{ padding: "28px", textAlign: "center", color: "#94a3b8" }}>
                No flights found matching your search.
            </div>
        );
    }

    return (
        <div className="flight-results">
            <div className="flight-row-header">
                <div>Airline</div>
                <div>Ident</div>
                <div>Aircraft</div>
                <div>Status</div>
                <div>Date</div>
                <div>Departure</div>
                <div>Arrival</div>
            </div>
            {flights.map((flight) => (
                <div className="flight-row-result" key={flight.id}>
                    <div>{flight.airline}</div>
                    <div>{flight.flightNumber}</div>
                    <div>{flight.aircraft}</div>
                    <div>{flight.status}</div>
                    <div>{flight.date}</div>
                    <div>{flight.departure}</div>
                    <div>{flight.arrival}</div>
                </div>
            ))}
        </div>
    );
}

export default FlightResultCard;