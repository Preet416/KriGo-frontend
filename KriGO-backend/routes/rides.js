
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY 
);

router.post('/create', async (req, res) => {
  console.log('Incoming ride data at backend:', req.body);

  const { pickup, drop, car_type } = req.body;

  if (!pickup) {
    return res.status(400).json({
      error: 'Pickup is required',
      received: req.body,
    });
  }

  
  const { data, error } = await supabase
    .from('rides')
    .insert([
      {
        pickup,
        drop,
        car_type,
        status: 'pending',
        date: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, ride: data[0] });
});

export default router;
