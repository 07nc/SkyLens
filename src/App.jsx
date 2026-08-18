import LiveMap from './components/map/LiveMap'
import { FlightProvider } from './context/FlightContext'

function App() {
  return (
    <FlightProvider>
      <div style={{ height: '100vh', width: '100vw' }}>
        <LiveMap />
      </div>
    </FlightProvider>
  )
}

export default App
