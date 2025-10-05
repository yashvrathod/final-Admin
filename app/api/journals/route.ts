import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(journals)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch journals" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const journal = await prisma.journal.create({ data: body })
    return NextResponse.json(journal)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create journal" }, { status: 500 })
  }
}
