'use client';
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount, pickup, dropoff, carType }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    
    try {
      const res = await fetch('http://localhost:5000/api/rides/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup:pickup,
          drop: dropoff,
          car_type: carType,
          status: 'pending_payment',
        }),
      });

      const data = await res.json();
      console.log('Ride created before payment:', data);

      if (data.error) {
        alert('Error saving ride: ' + data.error);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error('Ride save failed:', err);
      alert('Failed to save ride.');
      setLoading(false);
      return;
    }

    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/payment-success',
      },
    });

    if (error) {
      console.error('Stripe confirm error:', error);
      alert('Stripe error: ' + (error.message || 'Payment failed'));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="m-5 font-bold">Amount to Pay: {amount}</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          disabled={!stripe || loading}
          className="w-full bg-black text-white p-2 rounded-lg mt-2"
        >
          {loading ? 'Processing…' : `Pay ₹${amount}`}
        </button>
      </form>
    </div>
  );
}
