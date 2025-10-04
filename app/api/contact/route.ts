import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact submissions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const submission = await prisma.contactSubmission.create({ data: body })
    return NextResponse.json(submission)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contact submission" }, { status: 500 })
  }
}
