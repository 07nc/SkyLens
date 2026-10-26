const ADSB_URL = "/api/adsb/v2/point/22.5/82.5/1200";
const POLL_INTERVAL_MS = 15000;

function parseFlightData(rawData) {
    if (!rawData?.ac) return [];

    return rawData.ac
        .filter(ac => ac.lat != null && ac.lon != null &&
            ac.lat >= 6.5 && ac.lat <= 37.5 && ac.lon >= 68.0 && ac.lon <= 97.5)
        .map(ac => {
            const onGround = ac.alt_baro === "ground" || ac.alt_geom === "ground" || ac.alt_baro <= 0;
            const altitude = typeof ac.alt_baro === "number" ? ac.alt_baro * 0.3048 : (onGround ? 0 : null);

            return {
                id: ac.hex,
                callsign: ac.flight?.trim() || ac.r?.trim() || "Unknown",
                latitude: ac.lat,
                longitude: ac.lon,
                altitude,
                speed: ac.gs != null ? ac.gs * 0.514444 : null,
                heading: ac.track ?? 0,
                onGround: Boolean(onGround)
            };
        });
}

export async function getLiveFlights() {
    const res = await fetch(ADSB_URL);
    const data = await res.json();
    return parseFlightData(data);
}

export function startFlightPolling(setLiveFlights) {
    const update = async () => {
        try {
            const flights = await getLiveFlights();
            setLiveFlights(flights);
        } catch (error) {
            console.error("adsb.lol polling error:", error);
        }
    };

    update();
    const intervalId = setInterval(update, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId);
}
