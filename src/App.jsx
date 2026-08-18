import { useState } from "react";
import Navbar from "./components/Flight-Finder/Navbar";
function App() {
    const [currentView, setCurrentView] = useState("finder");

    return (
        <div>
            <Navbar
                currentView={currentView}
                onViewChange={setCurrentView}
            />
        </div>
    );
}
export default App;