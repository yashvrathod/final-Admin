import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

// -------------------------------
// PROJECTS SECTION
// -------------------------------

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createProject(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const type = formData.get("type") as string;
  const typeCompany = formData.get("typeCompany") as string;
  const typeUrl = formData.get("typeUrl") as string;
  const image = formData.get("image") as string;
  const testimonial = formData.get("testimonial") as string;
  const ytLink = formData.get("ytLink") as string;
  const linkedinPost = formData.get("linkedinPost") as string;
  const technologies = formData.get("technologies") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  // Parse skills array
  const skillsInput = formData.get("skills") as string;
  const skills = skillsInput ? skillsInput.split(",").map((s) => s.trim()) : [];

  const maxOrder = await prisma.project.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.project.create({
    data: {
      title,
      shortDescription,
      type,
      typeCompany,
      typeUrl,
      image,
      testimonial,
      ytLink,
      linkedinPost,
      technologies,
      projectUrl,
      githubUrl,
      startDate,
      endDate,
      skills,
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

  await prisma.project.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath("/admin/projects");
}

// -------------------------------
// PROJECT SKILLS SECTION
// -------------------------------

async function getProjectSkills() {
  return await prisma.projectSkill.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createProjectSkill(formData: FormData) {
  "use server";

  const skill = formData.get("skill") as string;

  const maxOrder = await prisma.projectSkill.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.projectSkill.create({
    data: {
      skill,
      order: (maxOrder?.order || 0) + 1,
    },
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
// MAIN PAGE
// -------------------------------

export default async function ProjectsPage() {
  const [projects, projectSkills] = await Promise.all([
    getProjects(),
    getProjectSkills(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-slate-500">
          Manage your research and development projects
        </p>
      </div>

      {/* ---------- Add Project ---------- */}
      <Card>
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
          <CardDescription>Add a new project to your portfolio</CardDescription>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="Industry Sponsored / In-House"
                />
              </div>
              <div>
                <Label htmlFor="typeCompany">Company Name</Label>
                <Input id="typeCompany" name="typeCompany" />
              </div>
            </div>

            <div>
              <Label htmlFor="typeUrl">Company URL</Label>
              <Input
                id="typeUrl"
                name="typeUrl"
                placeholder="https://company.com"
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" placeholder="https://..." />
            </div>

            <div>
              <Label htmlFor="testimonial">Testimonial</Label>
              <Textarea id="testimonial" name="testimonial" rows={2} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ytLink">YouTube Link</Label>
                <Input id="ytLink" name="ytLink" />
              </div>
              <div>
                <Label htmlFor="linkedinPost">LinkedIn Post</Label>
                <Input id="linkedinPost" name="linkedinPost" />
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                placeholder="React, Node.js, Prisma"
              />
            </div>

            <div>
              <Label htmlFor="technologies">Technologies</Label>
              <Input id="technologies" name="technologies" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectUrl">Project URL</Label>
                <Input id="projectUrl" name="projectUrl" />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" />
              </div>
            </div>

            <Button type="submit">Add Project</Button>
          </form>
        </CardContent>
      </Card>

      {/* ---------- Projects List ---------- */}
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>Manage existing projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects yet</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{project.title}</div>
                    {project.shortDescription && (
                      <p className="text-sm text-slate-500 mt-1">
                        {project.shortDescription}
                      </p>
                    )}
                    {project.technologies && (
                      <p className="text-sm text-slate-500 mt-1">
                        Tech: {project.technologies}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <input
                        type="hidden"
                        name="isActive"
                        value={String(project.isActive)}
                      />
                      <Switch checked={project.isActive} />
                    </form>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <Button type="submit" variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* ---------- Project Skills ---------- */}
      <Card>
        <CardHeader>
          <CardTitle>Project Skills</CardTitle>
          <CardDescription>
            Manage the skills available for projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={createProjectSkill} className="flex items-center gap-2">
            <Input name="skill" placeholder="Enter skill name" required />
            <Button type="submit">Add Skill</Button>
          </form>

          <div className="space-y-4">
            {projectSkills.length === 0 ? (
              <p className="text-sm text-slate-500">No skills yet</p>
            ) : (
              projectSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="font-medium">{skill.skill}</div>
                  <div className="flex items-center gap-2">
                    <form action={toggleProjectSkill}>
                      <input type="hidden" name="id" value={skill.id} />
                      <input
                        type="hidden"
                        name="isActive"
                        value={String(skill.isActive)}
                      />
                      <Switch checked={skill.isActive} />
                    </form>
                    <form action={deleteProjectSkill}>
                      <input type="hidden" name="id" value={skill.id} />
                      <Button type="submit" variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
