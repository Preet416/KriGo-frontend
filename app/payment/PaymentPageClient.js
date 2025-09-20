"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "../../components/Home/CheckoutForm";

export default function PaymentPageClient() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount") || 0);
  const pickup = searchParams.get("pickup") || "";
  const dropoff = searchParams.get("dropoff") || "";
  const carType = searchParams.get("carType") || "";

  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    } else {
      console.error("Stripe publishable key is missing!");
      setError("Stripe publishable key is missing. Check .env.local");
    }
  }, []);

  useEffect(() => {
    if (amount <= 0) {
      setError("Invalid amount. Add ?amount=100 to URL");
      return;
    }

    async function createPaymentIntent() {
      try {
        const res = await fetch("/api/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          setError(data.error || "Failed to create payment intent");
          return;
        }
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || "Network error");
      }
    }

    createPaymentIntent();
  }, [amount]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!clientSecret || !stripePromise) return <p>Loading payment form…</p>;

  const options = { clientSecret, appearance: { theme: "stripe" } };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        pickup={pickup}
        dropoff={dropoff}
        carType={carType}
      />
    </Elements>
  );
}
