import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getInterests() {
  return await prisma.academicInterest.findMany({
    orderBy: { order: "asc" },
  })
}

async function createInterest(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string

  const maxOrder = await prisma.academicInterest.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.academicInterest.create({
    data: {
      title,
      description,
      icon,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/interests")
}

async function deleteInterest(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.academicInterest.delete({ where: { id } })
  revalidatePath("/admin/interests")
}

async function toggleInterest(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.academicInterest.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/interests")
}

export default async function InterestsPage() {
  const interests = await getInterests()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Academic Interests</h1>
        <p className="text-slate-500">Manage your research interests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Interest</CardTitle>
          <CardDescription>Add a new research interest</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createInterest} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Machine Learning" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (optional)</Label>
                <Input id="icon" name="icon" placeholder="Brain" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of your interest..."
                rows={3}
              />
            </div>

            <Button type="submit">Add Interest</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Research Interests</CardTitle>
          <CardDescription>Manage existing interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interests.length === 0 ? (
              <p className="text-sm text-slate-500">No interests yet</p>
            ) : (
              interests.map((interest) => (
                <div key={interest.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{interest.title}</div>
                    {interest.description && <p className="text-sm text-slate-500 mt-1">{interest.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleInterest}>
                      <input type="hidden" name="id" value={interest.id} />
                      <input type="hidden" name="isActive" value={String(interest.isActive)} />
                      <Switch checked={interest.isActive} />
                    </form>
                    <form action={deleteInterest}>
                      <input type="hidden" name="id" value={interest.id} />
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
