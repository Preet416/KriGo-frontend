'use client';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { geocodeAddress } from '../../utils/geocode';

export default function GoogleMapSection({ pickup, dropoff, onCoordsChange }) {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      if (pickup && dropoff) {
        try {
          const p = await geocodeAddress(pickup);
          const d = await geocodeAddress(dropoff);
          setPickupCoords(p);
          setDropoffCoords(d);
          onCoordsChange({ pickupCoords: p, dropoffCoords: d });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchCoords();
  }, [pickup, dropoff]);

  const center = pickupCoords || [19.076, 72.8777];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {pickupCoords && <Marker position={pickupCoords} icon={L.icon({ iconUrl: '/marker-icon.png' })} />}
        {dropoffCoords && <Marker position={dropoffCoords} icon={L.icon({ iconUrl: '/marker-icon.png' })} />}
        {pickupCoords && dropoffCoords && (
          <Polyline positions={[pickupCoords, dropoffCoords]} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}
