import { useState } from 'react'
import LiveMap from './components/Map/LiveMap'
import { FlightProvider } from './context/FlightContext'
import NavBar from './components/UI/NavBar'
import FlightFinderView from './components/Flight-Finder/FlightFinderView'
import FlightSidePanel from './components/Details/FlightSidePanel'

function App() {
  const [currentView, setCurrentView] = useState('radar')

  return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <NavBar currentView={currentView} onViewChange={setCurrentView}></NavBar>
    <FlightProvider>
      <div style={{ height: '100%', width: '100vw', flex: 1, position: 'relative', overflow: 'hidden' }}>
        {currentView === 'radar' ? <LiveMap /> : <FlightFinderView />}
        <FlightSidePanel />
      </div>
    </FlightProvider>
  </div>
  )
}

export default App