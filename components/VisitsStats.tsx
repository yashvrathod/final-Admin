"use client";

import { useEffect, useState } from "react";

export default function VisitsStats() {
  const [stats, setStats] = useState({ totalVisits: 0, todayVisits: 0 });

  const fetchStats = async () => {
    const res = await fetch("/api/visits", { cache: "no-store" });
    const data = await res.json();
    setStats(data);
  };

  // record a visit + fetch stats
  const recordVisit = async () => {
    await fetch("/api/visits", { method: "POST" });
    fetchStats();
  };

  useEffect(() => {
    recordVisit(); // record visit on load
    const interval = setInterval(fetchStats, 5000); // refresh stats every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 justify-center">
      <div className="bg-white/70 backdrop-blur-md p-3 rounded-xl shadow text-center">
        <p className="text-xs text-gray-600">Total Visits</p>
        <h2 className="text-xl font-semibold text-amber-800">
          {stats.totalVisits}
        </h2>
      </div>
      <div className="bg-white/70 backdrop-blur-md p-3 rounded-xl shadow text-center">
        <p className="text-xs text-gray-600">Today's Visits</p>
        <h2 className="text-xl font-semibold text-amber-800">
          {stats.todayVisits}
        </h2>
      </div>
    </div>
  );
}
