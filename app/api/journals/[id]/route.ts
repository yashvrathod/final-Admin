import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const journal = await prisma.journal.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(journal)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update journal" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.journal.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete journal" }, { status: 500 })
  }
}
