'use client';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  useEffect(() => {
    const stored = localStorage.getItem('ridePayload');
    if (stored) {
      const ridePayload = JSON.parse(stored);
      console.log('✅ Parsed ridePayload:', ridePayload);

      fetch('http://localhost:5000/api/rides/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ridePayload), 
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('🎉 Ride saved from success page:', data);
        })
        .catch((err) =>
          console.error('Error saving ride from success page:', err)
        );
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Payment successful ✅</h1>
      <p>Your ride info is being saved…</p>
    </div>
  );
}
