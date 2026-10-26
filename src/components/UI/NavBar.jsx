import { useLocation, useNavigate } from "react-router-dom";
import SkylensLogo from "./SkyLensLogo";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isRadar = location.pathname === "/";
    const isFinder = location.pathname === "/finder";

    return (
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
                </div>
            </div>
        </nav>
    );
}

export default Navbar;