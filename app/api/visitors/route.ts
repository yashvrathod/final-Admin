// app/api/visitors/route.js
export async function GET() {
  try {
    const res = await fetch(
      "https://yashrathod.goatcounter.com/api/v0/stats/total",
      {
        headers: {
          Authorization: `Bearer ${process.env.GOATCOUNTER_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ GoatCounter API error:", text);
      return new Response(
        JSON.stringify({ error: "Failed to fetch stats", details: text }),
        {
          status: res.status,
        }
      );
    }

    const data = await res.json();
    console.log("✅ GoatCounter API data:", data);

    const totalVisits = data.total || 0;
    const todayStats = data.stats?.[data.stats.length - 1] || {};
    const todayVisits = todayStats.daily || 0;

    return new Response(
      JSON.stringify({
        totalVisits,
        todayVisits,
        daily: data.stats || [],
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("💥 API route crashed:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
