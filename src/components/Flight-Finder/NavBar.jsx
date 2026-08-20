function Navbar({ currentView, onViewChange }) {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo-name">
                    <span className="logo-icon">◉</span>
                    <span>SkyLens</span>
                </div>
                <div className="nav-buttons">
                    <div className="switch-buttons">
                        <button
                            className={currentView === "radar" ? "active" : ""}
                            onClick={() => onViewChange("radar")}
                        >
                            Live Radar
                        </button>
                        <button
                            className={currentView === "finder" ? "active" : ""}
                            onClick={() => onViewChange("finder")}
                        >
                            Flight Finder
                        </button>
                    </div>
                    
                </div>
            </div>
        </nav>
    );
}
export default Navbar;