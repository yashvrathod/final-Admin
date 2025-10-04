import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getTalks() {
  return await prisma.talk.findMany({
    orderBy: { order: "asc" },
  })
}

async function createTalk(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const event = formData.get("event") as string
  const date = formData.get("date") as string
  const location = formData.get("location") as string
  const description = formData.get("description") as string
  const slidesUrl = formData.get("slidesUrl") as string
  const videoUrl = formData.get("videoUrl") as string

  const maxOrder = await prisma.talk.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.talk.create({
    data: {
      title,
      event,
      date,
      location,
      description,
      slidesUrl,
      videoUrl,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/talks")
}

async function deleteTalk(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.talk.delete({ where: { id } })
  revalidatePath("/admin/talks")
}

async function toggleTalk(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.talk.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/talks")
}

export default async function TalksPage() {
  const talks = await getTalks()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Talks & Presentations</h1>
        <p className="text-slate-500">Manage your speaking engagements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Talk</CardTitle>
          <CardDescription>Add a new talk or presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTalk} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Talk Title</Label>
              <Input id="title" name="title" placeholder="The Future of AI" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event">Event Name</Label>
                <Input id="event" name="event" placeholder="TechConf 2024" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" placeholder="March 15, 2024" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="San Francisco, CA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Talk description..." rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slidesUrl">Slides URL</Label>
                <Input id="slidesUrl" name="slidesUrl" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input id="videoUrl" name="videoUrl" placeholder="https://..." />
              </div>
            </div>

            <Button type="submit">Add Talk</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Talks List</CardTitle>
          <CardDescription>Manage existing talks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {talks.length === 0 ? (
              <p className="text-sm text-slate-500">No talks yet</p>
            ) : (
              talks.map((talk) => (
                <div key={talk.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{talk.title}</div>
                    <div className="text-sm text-slate-500">{talk.event}</div>
                    {talk.date && <div className="text-sm text-slate-500">{talk.date}</div>}
                    <div className="flex gap-2 mt-2">
                      {talk.slidesUrl && (
                        <a
                          href={talk.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Slides
                        </a>
                      )}
                      {talk.videoUrl && (
                        <a
                          href={talk.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleTalk}>
                      <input type="hidden" name="id" value={talk.id} />
                      <input type="hidden" name="isActive" value={String(talk.isActive)} />
                      <Switch checked={talk.isActive} />
                    </form>
                    <form action={deleteTalk}>
                      <input type="hidden" name="id" value={talk.id} />
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
