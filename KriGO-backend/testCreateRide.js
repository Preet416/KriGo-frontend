
async function testRide() {
  const res = await fetch('http://localhost:5000/api/rides/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pickup: 'Test Pickup',
      drop: 'Test Drop',
      car_type: 'Mini'
    }),
  });
  const data = await res.json();
  console.log(data);
}

testRide();
