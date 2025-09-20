
'use client';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe('pk_test_xxxxxxxxxxxxx');

export default function PaymentWrapper({ amount, pickup, dropoff, carType }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }), 
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) return <p>Loading payment form…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        amount={amount}
        pickup={pickup}
        dropoff={dropoff}
        carType={carType}
      />
    </Elements>
  );
}
