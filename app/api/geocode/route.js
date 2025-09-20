
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
    }

   
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&countrycodes=in&q=${encodeURIComponent(
      query
    )}`;

    async function fetchWithRetry(u, options = {}, retries = 2) {
      try {
        const res = await fetch(u, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
      } catch (err) {
        if (retries > 0) return fetchWithRetry(u, options, retries - 1);
        throw err;
      }
    }

    const res = await fetchWithRetry(url, {
      headers: {
  "User-Agent": "UberClone/1.0 (kritikam.1524@gmail.com)",
  "Accept-Language": "en",
},

    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err) {
    console.error("Geocode API Error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch geocode" }), { status: 500 });
  }
}
