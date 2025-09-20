export async function geocodeAddress(address) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await res.json();
  if (!data[0]) throw new Error('No geocode result');
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}
