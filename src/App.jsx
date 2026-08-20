import LiveMap from './components/map/LiveMap'
import { FlightProvider } from './context/FlightContext'
import NavBar from './components/UI/NavBar'
function App() {
  return (<div style={{display:'flex',flexDirection:'column',height:'100vh'}}>
    <NavBar></NavBar>
    <FlightProvider>
      <div style={{ height: '100%', width: '100vw',flex:1 }}>
        <LiveMap />
      </div>
    </FlightProvider>
    </div>
  )
}

export default App
