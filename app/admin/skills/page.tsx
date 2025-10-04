import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: "asc" },
  })
}

async function createSkill(formData: FormData) {
  "use server"

  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const level = formData.get("level") as string

  const maxOrder = await prisma.skill.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.skill.create({
    data: {
      name,
      category,
      level,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/skills")
}

async function deleteSkill(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.skill.delete({ where: { id } })
  revalidatePath("/admin/skills")
}

async function toggleSkill(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.skill.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/skills")
}

export default async function SkillsPage() {
  const skills = await getSkills()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="text-slate-500">Manage your technical and academic skills</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Skill</CardTitle>
          <CardDescription>Add a new skill to your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createSkill} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input id="name" name="name" placeholder="Python" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Programming" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" name="level" placeholder="Expert" />
              </div>
            </div>

            <Button type="submit">Add Skill</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills List</CardTitle>
          <CardDescription>Manage existing skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.length === 0 ? (
              <p className="text-sm text-slate-500">No skills yet</p>
            ) : (
              skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-slate-500">
                      {skill.category} {skill.level && `• ${skill.level}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleSkill}>
                      <input type="hidden" name="id" value={skill.id} />
                      <input type="hidden" name="isActive" value={String(skill.isActive)} />
                      <Switch checked={skill.isActive} />
                    </form>
                    <form action={deleteSkill}>
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
  )
}
