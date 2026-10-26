import React from 'react';
import { useMap } from 'react-leaflet';
import '../../index.css';

export default function UserLocationButton({ userLocation }) {
    const map = useMap();

    const handleFlyTo = () => {
        if (userLocation) {
            map.flyTo(userLocation, 9, {
                duration: 1.8,
                easeLinearity: 0.25
            });
        }
    };

    return (
        <button
            onClick={handleFlyTo}
            title="My Location"
            className="user-location-btn"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="7" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
        </button>
    );
}
