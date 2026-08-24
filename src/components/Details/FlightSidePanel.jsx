import React, { useState, useEffect } from 'react';
import { useFlights } from '../../context/FlightContext';
import { fetchFlightDetails } from '../../services/flightDetailsService';

export default function FlightSidePanel() {

    const { selectedFlightID, setSelectedFlightID, liveFlights } = useFlights();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);


    const selectedFlight = liveFlights.find(f => f.id === selectedFlightID);

    useEffect(() => {

        if (selectedFlightID && selectedFlight) {
            setLoading(true);
            setDetails(null);

            fetchFlightDetails(selectedFlightID, selectedFlight.callsign)
                .then(data => {
                    setDetails(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching details:", err);
                    setLoading(false);
                });
        }
    }, [selectedFlightID, selectedFlight]);

    if (!selectedFlightID) {
        return null;
    }

    return (
        <div style={{
            position: 'absolute',
            top: '80px',
            right: '20px',
            width: '350px',
            maxHeight: 'calc(100% - 100px)',
            backgroundColor: '#120202',
            border: '1px solid #26313d',
            color: '#f1f5f9',
            zIndex: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            borderRadius: '12px',
            padding: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', margin: 0, color: '#f1f5f9' }}>Flight Details</h2>
                <button
                    onClick={() => setSelectedFlightID(null)}
                    style={{
                        background: 'transparent',
                        color: '#94a3b8',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    ✕
                </button>
            </div>

            {loading ? (
                <p style={{ color: '#94a3b8' }}>Loading flight data...</p>
            ) : details ? (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Airline</span>
                            <div style={{ color: '#FF2A55', fontWeight: '500' }}>{details.airline}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Registration</span>
                            <div>{details.registration}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Aircraft</span>
                            <div>{details.manufacturer} {details.model}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>ICAO Type</span>
                            <div>{details.icaoTypeCode}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', background: '#1a0505', padding: '12px', borderRadius: '8px', border: '1px solid #26313d' }}>
                            <div>
                                <span style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>Origin</span>
                                <div style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '16px', marginTop: '4px' }}>
                                    {details.route && details.route.length > 0 ? details.route[0] : 'Unknown'}
                                </div>
                            </div>
                            <div>
                                <span style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>Destination</span>
                                <div style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '16px', marginTop: '4px' }}>
                                    {details.route && details.route.length > 0 ? details.route[details.route.length - 1] : 'Unknown'}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <p style={{ color: '#94a3b8' }}>No detailed information available.</p>
            )}

            {selectedFlight && (
                <div style={{ marginTop: '24px', borderTop: '1px solid #26313d', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '12px' }}>Live Telemetry</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Callsign</span>
                            <div>{selectedFlight.callsign}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Altitude</span>
                            <div>{selectedFlight.altitude ? `${Math.round(selectedFlight.altitude)} m` : 'N/A'}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Speed</span>
                            <div>{selectedFlight.speed ? `${Math.round(selectedFlight.speed)} m/s` : 'N/A'}</div>
                        </div>
                        <div>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Heading</span>
                            <div>{selectedFlight.heading ? `${Math.round(selectedFlight.heading)}°` : 'N/A'}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
