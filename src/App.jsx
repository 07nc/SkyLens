import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LiveMap from './components/Map/LiveMap';
import { FlightProvider } from './context/FlightContext';
import NavBar from './components/UI/NavBar';
import FlightFinderView from './components/Flight-Finder/FlightFinderView';
import FlightSidePanel from './components/Details/FlightSidePanel';

function RadarView() {
  return (
    <>
      <LiveMap />
      <FlightSidePanel />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FlightProvider>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <NavBar />
          <div style={{ height: '100%', width: '100vw', flex: 1, position: 'relative', overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<RadarView />} />
              <Route path="/finder" element={<FlightFinderView />} />
            </Routes>
          </div>
        </div>
      </FlightProvider>
    </BrowserRouter>
  );
}

export default App;