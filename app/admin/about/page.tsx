import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getAboutSection() {
  const about = await prisma.aboutSection.findFirst()
  return about
}

async function updateAboutSection(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string

  const existing = await prisma.aboutSection.findFirst()

  if (existing) {
    await prisma.aboutSection.update({
      where: { id: existing.id },
      data: { title, description, imageUrl },
    })
  } else {
    await prisma.aboutSection.create({
      data: { title, description, imageUrl },
    })
  }

  revalidatePath("/admin/about")
}

export default async function AboutPage() {
  const about = await getAboutSection()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Section</h1>
        <p className="text-slate-500">Manage your about section content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>Update the about section displayed on your homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateAboutSection} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={about?.title || ""} placeholder="About Me" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={about?.description || ""}
                placeholder="Tell your story..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={about?.imageUrl || ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
