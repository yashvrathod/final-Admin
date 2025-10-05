import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const item = await prisma.navItem.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update navigation item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.navItem.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete navigation item" }, { status: 500 })
  }
}
