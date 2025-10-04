import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getTimelineItems() {
  return await prisma.timelineItem.findMany({
    orderBy: { order: "asc" },
  })
}

async function createTimelineItem(formData: FormData) {
  "use server"

  const year = formData.get("year") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  const maxOrder = await prisma.timelineItem.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.timelineItem.create({
    data: {
      year,
      title,
      description,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/timeline")
}

async function deleteTimelineItem(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.timelineItem.delete({ where: { id } })
  revalidatePath("/admin/timeline")
}

async function toggleTimelineItem(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.timelineItem.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/timeline")
}

export default async function TimelinePage() {
  const items = await getTimelineItems()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Timeline</h1>
        <p className="text-slate-500">Manage your academic timeline</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Timeline Item</CardTitle>
          <CardDescription>Add a new milestone to your timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTimelineItem} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" placeholder="2024" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="PhD Completed" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Brief description..." rows={3} />
            </div>

            <Button type="submit">Add Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline Items</CardTitle>
          <CardDescription>Manage existing timeline items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-slate-500">No timeline items yet</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.year}</span>
                      <span className="text-slate-500">•</span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {item.description && <p className="text-sm text-slate-500 mt-1">{item.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleTimelineItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="isActive" value={String(item.isActive)} />
                      <Switch checked={item.isActive} />
                    </form>
                    <form action={deleteTimelineItem}>
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
