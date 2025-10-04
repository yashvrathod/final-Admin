import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getConferences() {
  return await prisma.conference.findMany({
    orderBy: { order: "asc" },
  })
}

async function createConference(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const authors = formData.get("authors") as string
  const conference = formData.get("conference") as string
  const year = formData.get("year") as string
  const location = formData.get("location") as string
  const doi = formData.get("doi") as string
  const url = formData.get("url") as string
  const abstract = formData.get("abstract") as string

  const maxOrder = await prisma.conference.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.conference.create({
    data: {
      title,
      authors,
      conference,
      year,
      location,
      doi,
      url,
      abstract,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/conferences")
}

async function deleteConference(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.conference.delete({ where: { id } })
  revalidatePath("/admin/conferences")
}

async function toggleConference(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.conference.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/conferences")
}

export default async function ConferencesPage() {
  const conferences = await getConferences()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conference Papers</h1>
        <p className="text-slate-500">Manage your conference publications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Conference Paper</CardTitle>
          <CardDescription>Add a new conference publication</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createConference} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Paper Title</Label>
              <Input id="title" name="title" placeholder="Title of the conference paper" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authors">Authors</Label>
              <Input id="authors" name="authors" placeholder="Smith, J., Doe, A., et al." required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="conference">Conference Name</Label>
                <Input id="conference" name="conference" placeholder="ICML 2024" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" placeholder="2024" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Vienna, Austria" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doi">DOI</Label>
                <Input id="doi" name="doi" placeholder="10.1000/xyz123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea id="abstract" name="abstract" placeholder="Paper abstract..." rows={4} />
            </div>

            <Button type="submit">Add Paper</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conference Papers List</CardTitle>
          <CardDescription>Manage existing conference papers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conferences.length === 0 ? (
              <p className="text-sm text-slate-500">No conference papers yet</p>
            ) : (
              conferences.map((conf) => (
                <div key={conf.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{conf.title}</div>
                    <div className="text-sm text-slate-500">{conf.authors}</div>
                    <div className="text-sm text-slate-500">
                      {conf.conference} {conf.year && `(${conf.year})`}
                    </div>
                    {conf.location && <div className="text-sm text-slate-500">{conf.location}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleConference}>
                      <input type="hidden" name="id" value={conf.id} />
                      <input type="hidden" name="isActive" value={String(conf.isActive)} />
                      <Switch checked={conf.isActive} />
                    </form>
                    <form action={deleteConference}>
                      <input type="hidden" name="id" value={conf.id} />
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
