'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchSection from '../../components/Home/SearchSection';
import { supabase } from '../../utils/supabaseClient';

// 👇 Leaflet map ko SSR se bachane ke liye dynamic import
const GoogleMapSection = dynamic(
  () => import('../../components/Home/GoogleMapSection'),
  { ssr: false }
);

export default function RidePage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [rideId, setRideId] = useState(null);

  const handleConfirmRide = async () => {
    if (!pickupCoords || !dropoffCoords) {
      alert('Please wait for the map to load coordinates before confirming.');
      return;
    }

    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          pickup,
          drop: dropoff, // because your table column is 'drop'
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert('Failed to save ride: ' + error.message);
      return;
    }

    setRideId(data[0].id);
    alert('Ride saved successfully! Now select a car.');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-1/3">
        <SearchSection
          pickup={pickup}
          dropoff={dropoff}
          setPickup={setPickup}
          setDropoff={setDropoff}
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
        />

        {!rideId && (
          <button
            className="p-3 bg-black text-white rounded-lg w-full mt-4"
            onClick={handleConfirmRide}
            disabled={!pickupCoords || !dropoffCoords}
          >
            Confirm Ride
          </button>
        )}
      </div>

      <div className="flex-1">
        <GoogleMapSection
          pickup={pickup}
          dropoff={dropoff}
          onCoordsChange={({ pickupCoords, dropoffCoords }) => {
            setPickupCoords(pickupCoords);
            setDropoffCoords(dropoffCoords);
          }}
        />
      </div>
    </div>
  );
}
