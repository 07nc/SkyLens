import { useEffect, useState } from "react";
import FlightFinderForm from "./FlightFinderForm";
import FlightResultCard from "./FlightResultCard";

function FlightFinderView() {

    const [flights, setFlights] = useState([]);

    const mockFlights = [
        {
            id: 1,
            airline: "Air India",
            flightNumber: "AIC2408",
            aircraft: "A359",
            status: "Scheduled",
            departure: "07:30 PM IST",
            arrival: "09:45 PM IST"
        },
        {
            id: 2,
            airline: "Air India",
            flightNumber: "AIC2426",
            aircraft: "A20N",
            status: "Scheduled",
            departure: "07:00 PM IST",
            arrival: "09:20 PM IST"
        },
        {
            id: 3,
            airline: "IndiGo",
            flightNumber: "IGO317",
            aircraft: "A321",
            status: "Scheduled",
            departure: "07:00 PM IST",
            arrival: "09:15 PM IST"
        },
        {
            id: 1,
            airline: "Air India",
            flightNumber: "AIC2408",
            aircraft: "A359",
            status: "Scheduled",
            departure: "07:30 PM IST",
            arrival: "09:45 PM IST"
        },
        {
            id: 2,
            airline: "Air India",
            flightNumber: "AIC2426",
            aircraft: "A20N",
            status: "Scheduled",
            departure: "07:00 PM IST",
            arrival: "09:20 PM IST"
        }

    ];
    useEffect(()=>setFlights(mockFlights),[]);
    
    

    return (
        <div className="flight-finder-view">

            <FlightFinderForm  />

                <FlightResultCard flights={flights} />

        </div>
    );
}

export default FlightFinderView;