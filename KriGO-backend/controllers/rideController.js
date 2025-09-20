import { supabase } from '../utils/supabaseClient.js';


export const getLiveRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getRideHistory = async (req, res) => {
  const { driverId } = req.params;
  try {
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('driver_id', driverId)
      .eq('status', 'completed')
      .order('date', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const acceptRequest = async (req, res) => {
  const { rideId, driverId } = req.body;

  try {
    const { data, error } = await supabase
      .from('rides')
      .update({ driver_id: driverId, status: 'accepted' })
      .eq('id', rideId)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
