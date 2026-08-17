import { Marker, Popup } from 'react-leaflet';
import '../../index.css' 
import L from 'leaflet';
export default function AirplaneMarker({flight, isSelected, onSelect}){
    const svgPlane = `
        <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path 
                fill="${isSelected ? '#0bdbfbfb' : '#ffbbcbfe'}" 
                stroke="#121212" 
                stroke-width="5" 
                stroke-linejoin="round"
                d="M 50 15 C 50 15, 54 20, 56 37 L 92 54 L 92 60 L 56 62 L 55 77 L 70 90 L 70 94 L 50 92 L 30 94 L 30 90 L 45 77 L 44 62 L 8 60 L 8 54 L 44 37 C 46 20, 50 15, 50 15 Z" 
            />
        </svg>
    `;
    
    var airplaneIcon=L.divIcon({html:`<div class="marker-container">
                <div style="
                transform: rotate(${flight.heading}deg);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center; 
                justify-content: center;
                ">
                    ${svgPlane}
                </div>
            </div>`,
        className:isSelected?"selected-airplane":"",
        iconSize: [30, 30], 
        iconAnchor: [15,15]
    })
    return <Marker
        position={[flight.latitude,flight.longitude]}
        icon={airplaneIcon}
        eventHandlers={{
            click:()=>!isSelected?onSelect(flight.id):onSelect(-1)
        }}
    >

    </Marker>
}