// KriGO-backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import paymentsRouter from "./routes/payments.js";
import ridesRouter from "./routes/rides.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/payments", paymentsRouter);
app.use("/api/rides", ridesRouter);

app.get("/", (req, res) => {
  res.send("KriGo backend running 🚗");
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
