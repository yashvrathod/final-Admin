import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst()
    return NextResponse.json(hero)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    const hero = await prisma.heroSection.upsert({
      where: { id: id || "default" },
      update: data,
      create: { id: "default", ...data },
    })

    return NextResponse.json(hero)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 })
  }
}
