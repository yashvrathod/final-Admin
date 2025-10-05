import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();

    // Validate id
    if (!params.id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("PUT /api/contact/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update contact submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.contactSubmission.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/contact/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete contact submission" },
      { status: 500 }
    );
  }
}
