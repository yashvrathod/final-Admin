import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getHeroSection() {
  const hero = await prisma.heroSection.findFirst()
  return hero
}

async function updateHeroSection(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const subtitle = formData.get("subtitle") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const ctaText = formData.get("ctaText") as string
  const ctaLink = formData.get("ctaLink") as string

  const existingHero = await prisma.heroSection.findFirst()

  if (existingHero) {
    await prisma.heroSection.update({
      where: { id: existingHero.id },
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        ctaText,
        ctaLink,
      },
    })
  } else {
    await prisma.heroSection.create({
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        ctaText,
        ctaLink,
      },
    })
  }

  revalidatePath("/admin/hero")
  revalidatePath("/")
  redirect("/admin/hero")
}

export default async function HeroSectionPage() {
  const hero = await getHeroSection()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hero Section</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage the main hero section that appears at the top of your homepage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hero Content</CardTitle>
            <CardDescription>Update the main headline and call-to-action</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateHeroSection} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" name="title" defaultValue={hero?.title || ""} placeholder="Dr. Anup Ingle" required />
                <p className="text-xs text-slate-500">Main headline (typically your name)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  defaultValue={hero?.subtitle || ""}
                  placeholder="Assistant Professor, E&TC"
                />
                <p className="text-xs text-slate-500">Your position or title</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={hero?.description || ""}
                  placeholder="PhD-qualified expert in Electronics and Communication Engineering..."
                  rows={5}
                />
                <p className="text-xs text-slate-500">Brief introduction about yourself</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profile Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  defaultValue={hero?.imageUrl || ""}
                  placeholder="https://example.com/profile.jpg"
                />
                <p className="text-xs text-slate-500">Full URL to your profile photo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ctaText">Call-to-Action Text</Label>
                  <Input id="ctaText" name="ctaText" defaultValue={hero?.ctaText || ""} placeholder="View My Work" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ctaLink">Call-to-Action Link</Label>
                  <Input id="ctaLink" name="ctaLink" defaultValue={hero?.ctaLink || ""} placeholder="/projects" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Save Hero Section
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your hero section will look</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
              {hero?.imageUrl && (
                <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto overflow-hidden">
                  <img src={hero.imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-amber-900">{hero?.title || "Your Name"}</h2>
                {hero?.subtitle && <p className="text-sm text-slate-700">{hero.subtitle}</p>}
                {hero?.description && <p className="text-xs text-slate-600 line-clamp-3">{hero.description}</p>}
                {hero?.ctaText && (
                  <button className="mt-4 px-4 py-2 bg-amber-600 text-white text-sm rounded-full">
                    {hero.ctaText}
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
