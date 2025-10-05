"use client";
import { useEffect, useState } from "react";
import { Users, Eye } from "lucide-react"; // 👥 Total, 👁️ Today

export default function VisitorCounter() {
  const [visits, setVisits] = useState({ total: null, today: null });

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        console.log("Visitor data:", data);
        setVisits({ total: data.totalVisits, today: data.todayVisits });
      } catch (err) {
        console.error("Failed to fetch visitor count:", err);
      }
    }
    fetchCount();
  }, []);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-2xl shadow-md px-6 py-3 w-58">
        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2 text-yellow-900 font-semibold">
            <Users size={18} strokeWidth={2} />
            <span>Total Visits</span>
          </div>
          <span className="text-yellow-900 font-bold">
            {visits.total === null ? "..." : visits.total}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-yellow-300"></div>

        {/* Today */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2 text-yellow-900 font-semibold">
            <Eye size={18} strokeWidth={2} />
            <span>Today's Visits</span>
          </div>
          <span className="text-yellow-900 font-bold">
            {visits.today === null ? "..." : visits.today}
          </span>
        </div>
      </div>
    </div>
  );
}
