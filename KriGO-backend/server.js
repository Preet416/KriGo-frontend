import 'dotenv/config';   
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import rideRoutes from './routes/rides.js'; 

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


app.use('/api/rides', rideRoutes);

app.get('/', (req, res) => {
  res.send('KriGO Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
