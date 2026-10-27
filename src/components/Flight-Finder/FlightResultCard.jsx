import { useSelector, useDispatch } from 'react-redux';
import { toggleWatchlist } from '../../store/watchlistSlice';

function FlightResultCard({ flights }) {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.watchlist);

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
            {flights.map((flight) => {
                const isSaved = watchlist.some(
                    item => item.callsign === flight.flightNumber || (flight.id && item.id === flight.id)
                );

                return (
                    <div className="flight-row-result" key={flight.id}>
                        <div>{flight.airline}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                                onClick={() => dispatch(toggleWatchlist({
                                    id: flight.id,
                                    callsign: flight.flightNumber,
                                    airline: flight.airline,
                                    model: flight.aircraft,
                                    route: { origin: flight.origin, destination: flight.destination }
                                }))}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: isSaved ? '#ffc107' : '#64748b',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    padding: '0 2px',
                                    lineHeight: 1
                                }}
                                title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                            >
                                {isSaved ? '★' : '☆'}
                            </button>
                            <span>{flight.flightNumber}</span>
                        </div>
                        <div>{flight.aircraft}</div>
                        <div>{flight.status}</div>
                        <div>{flight.date}</div>
                        <div>{flight.departure}</div>
                        <div>{flight.arrival}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default FlightResultCard;