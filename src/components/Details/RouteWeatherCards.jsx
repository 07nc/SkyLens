import React, { useState, useEffect } from 'react';
import AirportWeatherCard from './AirportWeatherCard';
import { fetchAirportWeather } from '../../services/weatherService';

export default function RouteWeatherCards({ route }) {

    const [originWeather, setOriginWeather] = useState(null);
    const [destinationWeather, setDestinationWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    // If route is returned from OpenSky, use it. If not, use DEL -> BOM so cards always show!
    const originCode = (route && route.length > 0 && route[0]) ? route[0] : 'DEL';
    const destinationCode = (route && route.length > 1) ? route[route.length - 1] : 'BOM';

    useEffect(() => {
        setLoading(true);
        setOriginWeather(null);
        setDestinationWeather(null);

        Promise.all([
            fetchAirportWeather(originCode),
            fetchAirportWeather(destinationCode)
        ])
        .then(([originData, destData]) => {
            setOriginWeather(originData);
            setDestinationWeather(destData);
            setLoading(false);
        })
        .catch(err => {
            console.error('Failed to fetch route weather:', err);
            setLoading(false);
        });

    }, [originCode, destinationCode]);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
        }}>
            <AirportWeatherCard
                label="Origin"
                airportCode={originCode}
                weatherData={originWeather}
                loading={loading}
            />

            <AirportWeatherCard
                label="Destination"
                airportCode={destinationCode}
                weatherData={destinationWeather}
                loading={loading}
            />
        </div>
    );
}
