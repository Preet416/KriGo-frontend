'use client';
import React, { useState, useEffect } from 'react';
import InputItem from './InputItem';
import CarListOptions from './CarListOptions';

export default function SearchSection({
  pickup,
  dropoff,
  setPickup,
  setDropoff,
  pickupCoords,
  dropoffCoords,
  onSelectCar, 
}) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) {
      setDistance(null);
      return;
    }
    const toRad = (x) => (x * Math.PI) / 180;
    const [lat1, lon1] = pickupCoords;
    const [lat2, lon2] = dropoffCoords;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance(parseFloat((R * c).toFixed(2)));
  }, [pickupCoords, dropoffCoords]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Get a ride</h2>

      <div className="space-y-4">
        <InputItem
          type="source"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <InputItem
          type="destination"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
        />
      </div>

      {distance && (
        <p className="mt-4 text-gray-700 text-sm">
          Distance: <span className="font-semibold">{distance} km</span>
        </p>
      )}

      {distance ? (
       <CarListOptions
        distance={distance}
        onSelectCar={onSelectCar} 
      />
      ) : null}
    </div>
  );
}
