import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Fetch data
async function getCourses() {
  return prisma.courseTaught.findMany({ orderBy: { order: "asc" } });
}

async function getProjects() {
  return prisma.projectGuidance.findMany({ orderBy: { order: "asc" } });
}

// Create
async function createCourse(formData: FormData) {
  "use server";
  const course = formData.get("course") as string;
  const maxOrder = await prisma.courseTaught.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.courseTaught.create({
    data: { course, order: (maxOrder?.order || 0) + 1 },
  });
  revalidatePath("/admin/teaching-projects");
}

async function createProject(formData: FormData) {
  "use server";
  const guidance = formData.get("guidance") as string;
  const maxOrder = await prisma.projectGuidance.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.projectGuidance.create({
    data: { guidance, order: (maxOrder?.order || 0) + 1 },
  });
  revalidatePath("/admin/teaching-projects");
}

// Delete
async function deleteCourse(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.courseTaught.delete({ where: { id } });
  revalidatePath("/admin/teaching-projects");
}

async function deleteProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.projectGuidance.delete({ where: { id } });
  revalidatePath("/admin/teaching-projects");
}

// Toggle
async function toggleCourse(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.courseTaught.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/teaching-projects");
}

async function toggleProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.projectGuidance.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/teaching-projects");
}

// Page
export default async function TeachingProjectsPage() {
  const courses = await getCourses();
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teaching & Project Guidance</h1>
        <p className="text-slate-500">
          Manage courses taught and project guidance
        </p>
      </div>

      {/* Courses Taught */}
      <Card>
        <CardHeader>
          <CardTitle>Add Course Taught</CardTitle>
          <CardDescription>Add a new course</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCourse} className="flex gap-2 mb-4">
            <Input name="course" placeholder="Course Name" required />
            <Button type="submit">Add</Button>
          </form>
          <div className="space-y-2">
            {courses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <span>{item.course}</span>
                <div className="flex items-center gap-2">
                  <form action={toggleCourse}>
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      type="hidden"
                      name="isActive"
                      value={String(item.isActive)}
                    />
                    <Switch checked={item.isActive} />
                  </form>
                  <form action={deleteCourse}>
                    <input type="hidden" name="id" value={item.id} />
                    <Button type="submit" variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Guidance */}
      <Card>
        <CardHeader>
          <CardTitle>Add Project Guidance</CardTitle>
          <CardDescription>Add a new guidance record</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="flex gap-2 mb-4">
            <Input name="guidance" placeholder="Project Guidance" required />
            <Button type="submit">Add</Button>
          </form>
          <div className="space-y-2">
            {projects.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <span>{item.guidance}</span>
                <div className="flex items-center gap-2">
                  <form action={toggleProject}>
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      type="hidden"
                      name="isActive"
                      value={String(item.isActive)}
                    />
                    <Switch checked={item.isActive} />
                  </form>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={item.id} />
                    <Button type="submit" variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
