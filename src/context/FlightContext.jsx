import { createContext, useContext, useEffect, useState } from "react"
import { startFlightPolling } from "../services/openSkyService"



const FlightContext = createContext(null)



export function FlightProvider({children}){

    const [liveFlights, setLiveFlights] = useState([])
    const [selectedFlight, setSelectedFlight] = useState(null)

    useEffect(() => {
        const stopPolling = startFlightPolling(setLiveFlights)

        return stopPolling
    }, [])


    return (
        <FlightContext.Provider value={{ 
            liveFlights, 
            selectedFlight, 
            setSelectedFlight 
        }}>
            {children}
        </FlightContext.Provider>
    )
}



export function useFlights() {
    const context = useContext(FlightContext)

    if (!context) {
        throw new Error("useFlights must be used inside FlightProvider")
    }

    return context
}