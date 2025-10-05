// app/admin/conferences/serverActions.ts
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteConferenceAction(id: string) {
  await prisma.conference.delete({ where: { id } });
  revalidatePath("/admin/conferences");
}

export async function toggleConferenceAction(id: string, isActive: boolean) {
  await prisma.conference.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/conferences");
}
