import airportsData from '../data/airports.json';

function getWeatherInfo(code) {
    if (code === 0) {
        return { icon: '☀️', text: 'Clear' };
    } else if (code === 1 || code === 2 || code === 3) {
        return { icon: '⛅', text: 'Partly Cloudy' };
    } else if (code === 45 || code === 48) {
        return { icon: '🌫️', text: 'Fog' };
    } else if (code >= 51 && code <= 67) {
        return { icon: '🌧️', text: 'Rain' };
    } else if (code >= 71 && code <= 77) {
        return { icon: '❄️', text: 'Snow' };
    } else if (code >= 80 && code <= 82) {
        return { icon: '🌦️', text: 'Showers' };
    } else if (code >= 95 && code <= 99) {
        return { icon: '⛈️', text: 'Thunderstorm' };
    }
    return { icon: '🌤️', text: 'Fair' };
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function getLocalTimeString(timeIso, tzAbbr) {
    if (!timeIso) return '';
    const parts = timeIso.split('T');
    if (parts.length < 2) return '';
    const timeOnly = parts[1].substring(0, 5);
    return tzAbbr ? `${timeOnly} ${tzAbbr}` : timeOnly;
}

export async function fetchAirportWeather(airportCode) {
    if (!airportCode || airportCode === 'Unknown') {
        return null;
    }

    const cleanCode = airportCode.trim().toUpperCase();

    const airport = airportsData.find(a => 
        a.iata === cleanCode || a.icao === cleanCode
    );

    if (!airport) {
        return null;
    }

    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + airport.lat + 
                    '&longitude=' + airport.lon + 
                    '&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto';

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Weather API error:', response.status);
            return null;
        }

        const data = await response.json();
        const current = data.current;

        if (!current) {
            return null;
        }

        const weatherInfo = getWeatherInfo(current.weather_code);
        const windDirection = getWindDirection(current.wind_direction_10m);
        const localTime = getLocalTimeString(current.time, data.timezone_abbreviation);

        return {
            airportCode: airport.iata || airport.icao,
            cityName: airport.city,
            temperature: Math.round(current.temperature_2m),
            weatherIcon: weatherInfo.icon,
            weatherText: weatherInfo.text,
            windSpeed: Math.round(current.wind_speed_10m),
            windDirection: windDirection,
            localTime: localTime
        };

    } catch (error) {
        console.error('Weather fetch failed:', error);
        return null;
    }
}
