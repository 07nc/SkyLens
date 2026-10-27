import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWatchlist, clearWatchlist } from '../../store/watchlistSlice';
import { useFlights } from '../../context/FlightContext';

export default function WatchlistModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const watchlist = useSelector((state) => state.watchlist);
    const { liveFlights, setSelectedFlightID } = useFlights();

    if (!isOpen) return null;

    const handleTrackFlight = (flight) => {
        const liveMatch = liveFlights.find(
            f => f.id === flight.id || (f.callsign && flight.callsign && f.callsign.toUpperCase() === flight.callsign.toUpperCase())
        );

        if (liveMatch) {
            setSelectedFlightID(liveMatch.id);
        } else if (flight.id) {
            setSelectedFlightID(flight.id);
        }

        navigate('/');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#120202',
                border: '1px solid #26313d',
                borderRadius: '14px',
                width: '100%',
                maxWidth: '480px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 16px 40px rgba(0,0,0,0.8)',
                overflow: 'hidden'
            }} onClick={(e) => e.stopPropagation()}>
                
                <div style={{
                    padding: '18px 24px',
                    borderBottom: '1px solid #26313d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#0b0101'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#ffc107', fontSize: '18px' }}>★</span>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9', fontWeight: '600' }}>
                            Watchlist
                        </h3>
                        <span style={{
                            background: 'rgba(255, 42, 85, 0.2)',
                            color: '#FF2A55',
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            marginLeft: '4px'
                        }}>
                            {watchlist.length}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {watchlist.length > 0 && (
                            <button
                                onClick={() => dispatch(clearWatchlist())}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Clear all
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#94a3b8',
                                fontSize: '18px',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div style={{
                    padding: '16px 20px',
                    overflowY: 'auto',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {watchlist.length === 0 ? (
                        <div style={{
                            padding: '40px 20px',
                            textAlign: 'center',
                            color: '#94a3b8'
                        }}>
                            <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.5 }}>★</div>
                            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>Your watchlist is empty</p>
                            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#64748b' }}>
                                Click the <span style={{ color: '#ffc107' }}>★ Watch</span> button in any flight panel to bookmark it here.
                            </p>
                        </div>
                    ) : (
                        watchlist.map((flight) => {
                            const isLive = liveFlights.some(
                                f => f.id === flight.id || (f.callsign && flight.callsign && f.callsign.toUpperCase() === flight.callsign.toUpperCase())
                            );

                            return (
                                <div
                                    key={flight.id || flight.callsign}
                                    style={{
                                        backgroundColor: '#171c24',
                                        border: '1px solid #26313d',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '12px',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{
                                                fontWeight: '700',
                                                fontSize: '15px',
                                                color: '#f1f5f9',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {flight.callsign}
                                            </span>
                                            {flight.airline && (
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: '#FF2A55',
                                                    background: 'rgba(255, 42, 85, 0.1)',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontWeight: '600'
                                                }}>
                                                    {flight.airline}
                                                </span>
                                            )}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginTop: '6px',
                                            fontSize: '12px',
                                            color: '#94a3b8'
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    width: '7px',
                                                    height: '7px',
                                                    borderRadius: '50%',
                                                    backgroundColor: isLive ? '#22c55e' : '#64748b',
                                                    boxShadow: isLive ? '0 0 6px #22c55e' : 'none'
                                                }} />
                                                <span style={{ color: isLive ? '#22c55e' : '#64748b' }}>
                                                    {isLive ? 'Live on Radar' : 'Offline / Distant'}
                                                </span>
                                            </span>

                                            {flight.model && (
                                                <span>• {flight.model}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button
                                            onClick={() => handleTrackFlight(flight)}
                                            style={{
                                                backgroundColor: isLive ? '#FF2A55' : 'rgba(255, 42, 85, 0.15)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                                transition: 'opacity 0.2s'
                                            }}
                                        >
                                            Track
                                        </button>

                                        <button
                                            onClick={() => dispatch(removeFromWatchlist(flight.id || flight.callsign))}
                                            title="Remove from watchlist"
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #26313d',
                                                color: '#94a3b8',
                                                borderRadius: '6px',
                                                width: '28px',
                                                height: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#ef4444';
                                                e.currentTarget.style.borderColor = '#ef4444';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#94a3b8';
                                                e.currentTarget.style.borderColor = '#26313d';
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
