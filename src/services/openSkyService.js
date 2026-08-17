const TOKEN_URL = "/auth/opensky/realms/opensky-network/protocol/openid-connect/token"
const OPEN_SKY_URL = "/api/opensky/states/all"
const CLIENT_ID = import.meta.env.VITE_OPENSKY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_OPENSKY_CLIENT_SECRET


const POLL_INTERVAL_MS = 30000
const INDIA_BOUNDS = {lamin: 6.5, lamax: 37.5, lomin: 68.0, lomax: 97.5}


let cachedToken = null
let tokenExpiresAt = 0




async function getAccessToken() {
    if (cachedToken && Date.now() < tokenExpiresAt - 60000) {
        return cachedToken
    }

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    })

    if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    cachedToken = data.access_token
    tokenExpiresAt = Date.now() + (data.expires_in || 1800) * 1000

    return cachedToken
}





async function fetchLiveFlights(){
    const token = await getAccessToken()

    const params = new URLSearchParams({
        lamin: INDIA_BOUNDS.lamin,
        lamax: INDIA_BOUNDS.lamax,
        lomin: INDIA_BOUNDS.lomin,
        lomax: INDIA_BOUNDS.lomax,
    })

    const response = await fetch(`${OPEN_SKY_URL}?${params}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error(`OpenSky request failed: ${response.status} ${response.statusText}`)
    }


    return response.json()
}





function parseFlightData(rawData) {
  if (!rawData || !rawData.states) {
    return [];
  }

  const flights = rawData.states
  .filter(s => s[8] === false)
  .map(s => ({
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