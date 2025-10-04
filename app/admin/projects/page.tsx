import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  })
}

async function createProject(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const technologies = formData.get("technologies") as string
  const projectUrl = formData.get("projectUrl") as string
  const githubUrl = formData.get("githubUrl") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string

  const maxOrder = await prisma.project.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
      technologies,
      projectUrl,
      githubUrl,
      startDate,
      endDate,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/projects")
}

async function deleteProject(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.project.delete({ where: { id } })
  revalidatePath("/admin/projects")
}

async function toggleProject(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.project.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/projects")
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-slate-500">Manage your research and development projects</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
          <CardDescription>Add a new project to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" name="title" placeholder="AI Research Platform" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Project description..." rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies</Label>
                <Input id="technologies" name="technologies" placeholder="Python, TensorFlow, React" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectUrl">Project URL</Label>
                <Input id="projectUrl" name="projectUrl" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/..." />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" placeholder="January 2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" placeholder="Present" />
              </div>
            </div>

            <Button type="submit">Add Project</Button>
          </form>
        </CardContent>
      </Card>

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
                <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{project.title}</div>
                    {project.description && <p className="text-sm text-slate-500 mt-1">{project.description}</p>}
                    {project.technologies && (
                      <div className="text-sm text-slate-500 mt-1">Tech: {project.technologies}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <input type="hidden" name="isActive" value={String(project.isActive)} />
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
    </div>
  )
}
