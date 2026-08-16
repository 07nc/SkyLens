
const OPEN_SKY_URL = "/api/opensky/states/all"
const POLL_INTERVAL_MS = 15000
const INDIA_BOUNDS = {lamin: 6.5, lamax: 37.5, lomin: 68.0, lomax: 97.5}





async function fetchLiveFlights(){

    const params = new URLSearchParams({
        lamin: INDIA_BOUNDS.lamin,
        lamax: INDIA_BOUNDS.lamax,
        lomin: INDIA_BOUNDS.lomin,
        lomax: INDIA_BOUNDS.lomax,
    })

    const response = await fetch(`${OPEN_SKY_URL}?${params}`)

    if (!response.ok) {
        throw new Error(`OpenSky request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
}





function parseFlightData(rawData) {
  if (!rawData || !rawData.states) {
    return [];
  }

  const flights = rawData.states.map(s => ({
        id: s[0],
        callsign: s[1] ? s[1].trim() : "Unknown",
        latitude: s[6],
        longitude: s[5],
        altitude: s[7] ?? null,
        speed: s[9] ?? null,
        heading: s[10] ?? null
        }))

    return flights
}



async function getLiveFlights() {
  const rawData = await fetchLiveFlights();
  return parseFlightData(rawData);
}



function startFlightPolling(setLiveFlights) {

    async function updateFlights() {
        try {
            const flights = await getLiveFlights()
            setLiveFlights(flights)
        } catch (error) {
            console.error("Failed to update live flights:", error)
        }
    }



    updateFlights()
    const intervalId = setInterval(updateFlights, POLL_INTERVAL_MS)

    return () => clearInterval(intervalId)
}

export { startFlightPolling }