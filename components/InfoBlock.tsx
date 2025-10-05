import React, { ReactNode } from "react";

interface InfoBlockProps {
  color?: "amber" | "blue" | "green" | "red"; // extend with other colors if needed
  children: ReactNode;
}

const colorClasses: Record<string, string> = {
  amber: "bg-amber-50 border-amber-200 text-amber-900",
  blue: "bg-blue-50 border-blue-200 text-blue-900",
  green: "bg-green-50 border-green-200 text-green-900",
  red: "bg-red-50 border-red-200 text-red-900",
};

export default function InfoBlock({
  color = "blue",
  children,
}: InfoBlockProps) {
  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]} shadow-sm`}>
      {children}
    </div>
  );
}
