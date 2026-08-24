import { getAccessToken } from './openSkyService';
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
            const token = await getAccessToken();
            const res = await fetch(`/api/opensky/routes?callsign=${callsign}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error("OpenSky Routes fetch failed:", error);
            return null;
        }
    };

    try {
        const [aircraftData, routeData] = await Promise.all([
            fetchAircraft(),
            fetchRoute()
        ]);

        const airlineIcao = callsign && callsign.length >= 3 ? callsign.substring(0, 3).toUpperCase() : null;
        const matchedAirline = airlinesData.find(a => a.icao === airlineIcao);
        const AirlineName = matchedAirline ? matchedAirline.name : (aircraftData?.RegisteredOwners || 'Unknown');

        return {
            registration: aircraftData?.Registration || 'Unknown',
            manufacturer: aircraftData?.Manufacturer || 'Unknown',
            model: aircraftData?.Type || 'Unknown',
            airline: AirlineName,
            icaoTypeCode: aircraftData?.ICAOTypeCode || 'Unknown',
            route: routeData?.route || [],
        };
    } catch (error) {

        console.error("Failed to fetch combined flight details:", error);
        return null;
    }
}
