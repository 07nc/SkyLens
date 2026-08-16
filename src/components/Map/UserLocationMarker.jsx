import {useState,useEffect} from 'react';
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import '../../index.css';

export default function UserLocationMarker(){
    const [position,setPosition]=useState(null);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (location)=>{setPosition([location.coords.latitude,location.coords.longitude])},
            (error)=>{console.warn("Location access denied: ",error.message)},
            {enableHighAccuracy:true,timeout:5000,maximumAge:0}
        )
    },[])
    if(!position){
        return null;
    }
    const userLocationIcon=L.divIcon({
        html:`<div class="userLocationContainer">
            <div class="userLocationDot"></div>
        </div>
        `,
        className:'',
        iconSize:[24,24],
        iconAnchor:[12,12]
    })
    return <Marker position={position} icon={userLocationIcon}>
        <Popup> You are here</Popup>
    </Marker>

}

