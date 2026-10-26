import airlinesData from '../data/airlines.json';

export async function fetchFlightDetails(icao24, callsign) {
    const fetchAircraft = async () => {
        if (!icao24) return null;
        try {
            const res = await fetch(`https://hexdb.io/api/v1/aircraft/${icao24}`);
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error("HexDB fetch failed:", error);
            return null;
        }
    };

    const fetchRoute = async () => {
        if (!callsign || callsign === "Unknown") return null;
        try {
            const cleanCallsign = callsign.trim().toUpperCase();
            let res = await fetch(`https://api.adsbdb.com/v0/callsign/${cleanCallsign}`);
            if (!res.ok && /[A-Z]$/.test(cleanCallsign)) {
                res = await fetch(`https://api.adsbdb.com/v0/callsign/${cleanCallsign.slice(0, -1)}`);
            }
            if (res.ok) {
                const data = await res.json();
                const route = data?.response?.flightroute;
                if (route?.origin && route?.destination) {
                    return {
                        route: [
                            route.origin.iata_code || route.origin.icao_code,
                            route.destination.iata_code || route.destination.icao_code
                        ],
                        origin: route.origin,
                        destination: route.destination,
                        airlineName: route.airline?.name
                    };
                }
            }
        } catch (error) {
            console.error("Route fetch failed:", error);
        }
        return null;
    };

    try {
        const [aircraftData, routeData] = await Promise.all([
            fetchAircraft(),
            fetchRoute()
        ]);

        const airlineIcao = callsign && callsign.length >= 3 ? callsign.substring(0, 3).toUpperCase() : null;
        const matchedAirline = airlinesData.find(a => a.icao === airlineIcao);
        const AirlineName = matchedAirline ? matchedAirline.name : (routeData?.airlineName || aircraftData?.RegisteredOwners || 'Unknown');

        return {
            registration: aircraftData?.Registration || 'N12345',
            manufacturer: aircraftData?.Manufacturer || 'Boeing',
            model: aircraftData?.Type || '737-800',
            airline: AirlineName,
            icaoTypeCode: aircraftData?.ICAOTypeCode || 'B738',
            route: routeData?.route || [],
            origin: routeData?.origin || null,
            destination: routeData?.destination || null,
        };
    } catch (error) {

        console.error("Failed to fetch combined flight details:", error);
        return null;
    }
}
