import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import ProjectsList from "./ProjectsList";
import ProjectSkillsList from "./ProjectSkillsList";

// -------------------------------
// Fetch functions
// -------------------------------

async function getProjects() {
  return await prisma.project.findMany({ orderBy: { order: "asc" } });
}

async function getProjectSkills() {
  return await prisma.projectSkill.findMany({ orderBy: { order: "asc" } });
}

// -------------------------------
// Server Actions
// -------------------------------

export async function createProject(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const technologies = formData.get("technologies") as string;

  const maxOrder = await prisma.project.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.project.create({
    data: {
      title,
      shortDescription,
      technologies,
      order: (maxOrder?.order || 0) + 1,
    },
  });

  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function toggleProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.project.update({ where: { id }, data: { isActive: !isActive } });
  revalidatePath("/admin/projects");
}

export async function createProjectSkill(formData: FormData) {
  "use server";
  const skill = formData.get("skill") as string;

  const maxOrder = await prisma.projectSkill.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.projectSkill.create({
    data: { skill, order: (maxOrder?.order || 0) + 1 },
  });

  revalidatePath("/admin/projects");
}

export async function deleteProjectSkill(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.projectSkill.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function toggleProjectSkill(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.projectSkill.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/projects");
}

// -------------------------------
// Main Page
// -------------------------------

export default async function ProjectsPage() {
  const [projects, projectSkills] = await Promise.all([
    getProjects(),
    getProjectSkills(),
  ]);

  return (
    <div className="space-y-10 p-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-slate-500">Manage your projects and skills</p>

      {/* Add Project Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
          <CardDescription>Add a new project</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input id="technologies" name="technologies" />
            </div>
            <Button type="submit">Add Project</Button>
          </form>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>Manage existing projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsList
            projects={projects}
            toggleProject={async (id, isActive) => {
              "use server";
              await prisma.project.update({
                where: { id },
                data: { isActive: !isActive },
              });
            }}
            deleteProject={async (id) => {
              "use server";
              await prisma.project.delete({ where: { id } });
            }}
          />
        </CardContent>
      </Card>

      {/* Add Project Skill */}
      <Card>
        <CardHeader>
          <CardTitle>Project Skills</CardTitle>
          <CardDescription>Manage the skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={createProjectSkill} className="flex gap-2">
            <Input name="skill" placeholder="Enter skill name" required />
            <Button type="submit">Add Skill</Button>
          </form>
          <ProjectSkillsList
            skills={projectSkills}
            toggleSkill={async (id, isActive) => {
              "use server";
              await prisma.projectSkill.update({
                where: { id },
                data: { isActive: !isActive },
              });
            }}
            deleteSkill={async (id) => {
              "use server";
              await prisma.projectSkill.delete({ where: { id } });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
