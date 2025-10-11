import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

// --------------------------- Fetch ---------------------------
async function getResearchInterests() {
  return prisma.researchInterest.findMany({ orderBy: { order: "asc" } });
}
async function getTeachingInterests() {
  return prisma.teachingInterest.findMany({ orderBy: { order: "asc" } });
}
async function getAreaOfInterests() {
  return prisma.areaOfInterest.findMany({ orderBy: { order: "asc" } });
}
async function getUltimateGoals() {
  return prisma.ultimateGoal.findMany({ orderBy: { createdAt: "asc" } });
}

// --------------------------- Create ---------------------------
async function createResearchInterest(formData: FormData) {
  "use server";
  const interest = formData.get("interest") as string;
  const maxOrder = await prisma.researchInterest.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.researchInterest.create({
    data: { interest, order: (maxOrder?.order || 0) + 1 },
  });
  revalidatePath("/admin/interests");
}

async function createTeachingInterest(formData: FormData) {
  "use server";
  const interest = formData.get("interest") as string;
  const maxOrder = await prisma.teachingInterest.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.teachingInterest.create({
    data: { interest, order: (maxOrder?.order || 0) + 1 },
  });
  revalidatePath("/admin/interests");
}

async function createAreaOfInterest(formData: FormData) {
  "use server";
  const interest = formData.get("interest") as string;
  const maxOrder = await prisma.areaOfInterest.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.areaOfInterest.create({
    data: { interest, order: (maxOrder?.order || 0) + 1 },
  });
  revalidatePath("/admin/interests");
}

async function createUltimateGoal(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  await prisma.ultimateGoal.create({ data: { title, description } });
  revalidatePath("/admin/interests");
}

// --------------------------- Delete ---------------------------
async function deleteResearchInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.researchInterest.delete({ where: { id } });
  revalidatePath("/admin/interests");
}
async function deleteTeachingInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.teachingInterest.delete({ where: { id } });
  revalidatePath("/admin/interests");
}
async function deleteAreaOfInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.areaOfInterest.delete({ where: { id } });
  revalidatePath("/admin/interests");
}
async function deleteUltimateGoal(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.ultimateGoal.delete({ where: { id } });
  revalidatePath("/admin/interests");
}

// --------------------------- Toggle ---------------------------
async function toggleResearchInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.researchInterest.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/interests");
}
async function toggleTeachingInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.teachingInterest.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/interests");
}
async function toggleAreaOfInterest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.areaOfInterest.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/interests");
}
async function toggleUltimateGoal(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.ultimateGoal.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/interests");
}

// --------------------------- Page ---------------------------
export default async function InterestsPage() {
  const research = await getResearchInterests();
  const teaching = await getTeachingInterests();
  const area = await getAreaOfInterests();
  const goals = await getUltimateGoals();

  const renderList = (
    items: {
      id: string;
      interest?: string;
      title?: string;
      description?: string;
      isActive: boolean;
    }[],
    toggleFn: (formData: FormData) => Promise<void>,
    deleteFn: (formData: FormData) => Promise<void>,
    type: "interest" | "goal"
  ) => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No {type}s yet</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-4 border rounded-lg"
          >
            <div className="flex-1">
              <div className="font-medium">{item.interest || item.title}</div>
              {item.description && (
                <p className="text-sm text-slate-500 mt-1">
                  {item.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleFn}>
                <input type="hidden" name="id" value={item.id} />
                <input
                  type="hidden"
                  name="isActive"
                  value={String(item.isActive)}
                />
                <Switch checked={item.isActive} />
              </form>
              <form action={deleteFn}>
                <input type="hidden" name="id" value={item.id} />
                <Button type="submit" variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Academic Data</h1>

      {/* Research Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Add Research Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createResearchInterest} className="flex gap-2">
            <Input
              name="interest"
              placeholder="New research interest"
              required
            />
            <Button type="submit">Add</Button>
          </form>
          {renderList(
            research,
            toggleResearchInterest,
            deleteResearchInterest,
            "interest"
          )}
        </CardContent>
      </Card>

      {/* Teaching Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Add Teaching Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createTeachingInterest} className="flex gap-2">
            <Input
              name="interest"
              placeholder="New teaching interest"
              required
            />
            <Button type="submit">Add</Button>
          </form>
          {renderList(
            teaching,
            toggleTeachingInterest,
            deleteTeachingInterest,
            "interest"
          )}
        </CardContent>
      </Card>

      {/* Area of Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Add Area of Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAreaOfInterest} className="flex gap-2">
            <Input
              name="interest"
              placeholder="New area of interest"
              required
            />
            <Button type="submit">Add</Button>
          </form>
          {renderList(
            area,
            toggleAreaOfInterest,
            deleteAreaOfInterest,
            "interest"
          )}
        </CardContent>
      </Card>

      {/* Ultimate Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Add Ultimate Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createUltimateGoal} className="flex flex-col gap-2">
            <Input name="title" placeholder="Goal Title" required />
            <Textarea
              name="description"
              placeholder="Goal Description"
              required
            />
            <Button type="submit">Add</Button>
          </form>
          {renderList(goals, toggleUltimateGoal, deleteUltimateGoal, "goal")}
        </CardContent>
      </Card>
    </div>
  );
}
