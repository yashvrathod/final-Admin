import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Record a visit
export async function POST() {
  await prisma.visit.create({ data: {} });
  return NextResponse.json({ message: "Visit recorded" });
}

// Get total and today's visits
export async function GET() {
  const totalVisits = await prisma.visit.count();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayVisits = await prisma.visit.count({
    where: {
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  return NextResponse.json({ totalVisits, todayVisits });
}
