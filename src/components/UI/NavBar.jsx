import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SkylensLogo from "./SkyLensLogo";
import WatchlistModal from "./WatchlistModal";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const watchlist = useSelector((state) => state.watchlist);
    const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

    const isRadar = location.pathname === "/";
    const isFinder = location.pathname === "/finder";

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => navigate("/")}>
                        <SkylensLogo />
                    </div>
                    <div className="nav-buttons">
                        <div className="switch-buttons">
                            <button
                                className={isRadar ? "active" : ""}
                                onClick={() => navigate("/")}
                            >
                                Live Radar
                            </button>
                            <button
                                className={isFinder ? "active" : ""}
                                onClick={() => navigate("/finder")}
                            >
                                Flight Finder
                            </button>
                        </div>

                        <button
                            onClick={() => setIsWatchlistOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                background: watchlist.length > 0 ? 'rgba(255, 193, 7, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                                color: watchlist.length > 0 ? '#ffc107' : '#94a3b8',
                                border: watchlist.length > 0 ? '1px solid rgba(255, 193, 7, 0.35)' : '1px solid #26313d',
                                borderRadius: '7px',
                                padding: '8px 14px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span>★</span>
                            <span>Watchlist</span>
                            {watchlist.length > 0 && (
                                <span style={{
                                    background: '#ffc107',
                                    color: '#0b0101',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    padding: '1px 6px',
                                    marginLeft: '2px'
                                }}>
                                    {watchlist.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <WatchlistModal
                isOpen={isWatchlistOpen}
                onClose={() => setIsWatchlistOpen(false)}
            />
        </>
    );
}

export default Navbar;