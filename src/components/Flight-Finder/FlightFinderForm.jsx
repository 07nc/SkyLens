import { useState } from "react";
function FlightFinderForm({onSearch}){
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const today = new Date();
    const maxDate = new Date();
    const formatDate = (date) => {
    return date.toISOString().split("T")[0];
    };
    const minDate = formatDate(today);
    const maxAllowedDate = formatDate(maxDate);
    maxDate.setDate(today.getDate() + 7);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!origin || !destination || !date) {
            return;
        }
        onSearch({
            origin,
            destination,
            date
        });
    };
    return (
        <form className="flight-finder-form">
            <h2>Find a Flight</h2>
            <div className="form-fields">
                <div className="form-inp">
                    <label>Origin</label>
                    <input id="origin" type="text" placeholder="e.g DEL"
                    value={origin}
                    onChange={(e)=> setOrigin(e.target.value)}
                    ></input>
                    
                </div>
                <div className="form-inp">
                    <label>Destination</label>
                    <input id="destination" type="text" placeholder="e.g BOM"
                    value={destination}
                    onChange={(e)=> setDestination(e.target.value)}
                    ></input>
                </div>
                <div className="form-inp">
                    <label>Date</label>
                    <input id="date" type="date"
                    value={date}
                    min={minDate}
                    max={maxAllowedDate}
                    onChange={(e) => setDate(e.target.value)}
                    ></input>
                </div>
                <button type="submit" className="search-button">Search Flight</button>
            </div>
        </form>

    );
}
export default FlightFinderForm;