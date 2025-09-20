
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});


router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  console.log("Amount received:", amount);
  console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Amount is required and must be greater than 0" });
  }

  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: "inr",
    });

    console.log("PaymentIntent created:", paymentIntent.id);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
});

export default router;
