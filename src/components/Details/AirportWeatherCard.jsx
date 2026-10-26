import React from 'react';

export default function AirportWeatherCard({ label, airportCode, weatherData, loading }) {

    return (
        <div style={{
            background: '#1a0505',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #26313d',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px'
        }}>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{
                        color: '#94a3b8',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {label}
                    </span>

                    {weatherData && weatherData.localTime && (
                        <span style={{
                            color: '#FF2A55',
                            fontSize: '11px',
                            fontWeight: '600'
                        }}>
                            🕒 {weatherData.localTime}
                        </span>
                    )}
                </div>

                <div style={{
                    color: '#f1f5f9',
                    fontWeight: '700',
                    fontSize: '18px',
                    marginTop: '2px'
                }}>
                    {weatherData ? weatherData.airportCode : (airportCode || 'Unknown')}
                </div>

                {weatherData && weatherData.cityName && (
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                        {weatherData.cityName}
                    </div>
                )}
            </div>

            {loading ? (
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    Loading weather...
                </div>
            ) : weatherData ? (
                <div style={{
                    borderTop: '1px solid #26313d',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontSize: '18px' }}>
                            {weatherData.weatherIcon}
                        </span>
                        <span style={{
                            color: '#f1f5f9',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            {weatherData.temperature}°C
                        </span>
                        <span style={{
                            color: '#94a3b8',
                            fontSize: '11px'
                        }}>
                            {weatherData.weatherText}
                        </span>
                    </div>

                    <div style={{
                        color: '#94a3b8',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span>💨</span>
                        <span>{weatherData.windSpeed} km/h {weatherData.windDirection}</span>
                    </div>
                </div>
            ) : (
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>
                    Weather data unavailable
                </div>
            )}
        </div>
    );
}
