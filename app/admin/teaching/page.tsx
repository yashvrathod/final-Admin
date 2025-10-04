import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getTeaching() {
  return await prisma.teaching.findMany({
    orderBy: { order: "asc" },
  })
}

async function createTeaching(formData: FormData) {
  "use server"

  const course = formData.get("course") as string
  const institution = formData.get("institution") as string
  const duration = formData.get("duration") as string
  const description = formData.get("description") as string

  const maxOrder = await prisma.teaching.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.teaching.create({
    data: {
      course,
      institution,
      duration,
      description,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/teaching")
}

async function deleteTeaching(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.teaching.delete({ where: { id } })
  revalidatePath("/admin/teaching")
}

async function toggleTeaching(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.teaching.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/teaching")
}

export default async function TeachingPage() {
  const teaching = await getTeaching()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teaching Experience</h1>
        <p className="text-slate-500">Manage your teaching history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Teaching Experience</CardTitle>
          <CardDescription>Add a new course or teaching position</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTeaching} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course Name</Label>
                <Input id="course" name="course" placeholder="Data Structures" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" placeholder="MIT" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" name="duration" placeholder="Fall 2023 - Spring 2024" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Course details..." rows={3} />
            </div>

            <Button type="submit">Add Teaching Experience</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teaching History</CardTitle>
          <CardDescription>Manage existing teaching experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teaching.length === 0 ? (
              <p className="text-sm text-slate-500">No teaching experience yet</p>
            ) : (
              teaching.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.course}</div>
                    <div className="text-sm text-slate-500">{item.institution}</div>
                    {item.duration && <div className="text-sm text-slate-500">{item.duration}</div>}
                    {item.description && <p className="text-sm text-slate-500 mt-1">{item.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleTeaching}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="isActive" value={String(item.isActive)} />
                      <Switch checked={item.isActive} />
                    </form>
                    <form action={deleteTeaching}>
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
        </CardContent>
      </Card>
    </div>
  )
}
