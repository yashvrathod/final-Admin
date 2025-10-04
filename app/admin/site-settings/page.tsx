import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst()
  return settings
}

async function updateSiteSettings(formData: FormData) {
  "use server"

  const siteName = formData.get("siteName") as string
  const siteTagline = formData.get("siteTagline") as string
  const logoUrl = formData.get("logoUrl") as string
  const faviconUrl = formData.get("faviconUrl") as string
  const metaTitle = formData.get("metaTitle") as string
  const metaDescription = formData.get("metaDescription") as string

  const existingSettings = await prisma.siteSettings.findFirst()

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: {
        siteName,
        siteTagline,
        logoUrl,
        faviconUrl,
        metaTitle,
        metaDescription,
      },
    })
  } else {
    await prisma.siteSettings.create({
      data: {
        siteName,
        siteTagline,
        logoUrl,
        faviconUrl,
        metaTitle,
        metaDescription,
      },
    })
  }

  revalidatePath("/admin/site-settings")
  revalidatePath("/")
  redirect("/admin/site-settings")
}

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Site Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your website's global configuration and metadata
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your site's basic information and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateSiteSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name *</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  defaultValue={settings?.siteName || ""}
                  placeholder="Dr. John Doe - Academic Portfolio"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteTagline">Site Tagline</Label>
                <Input
                  id="siteTagline"
                  name="siteTagline"
                  defaultValue={settings?.siteTagline || ""}
                  placeholder="Professor of Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  type="url"
                  defaultValue={settings?.logoUrl || ""}
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-slate-500">Full URL to your site logo</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faviconUrl">Favicon URL</Label>
                <Input
                  id="faviconUrl"
                  name="faviconUrl"
                  type="url"
                  defaultValue={settings?.faviconUrl || ""}
                  placeholder="https://example.com/favicon.ico"
                />
                <p className="text-xs text-slate-500">Full URL to your favicon</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                defaultValue={settings?.metaTitle || ""}
                placeholder="Dr. John Doe - Academic Portfolio & Research"
              />
              <p className="text-xs text-slate-500">SEO title for search engines (50-60 characters)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                defaultValue={settings?.metaDescription || ""}
                placeholder="Explore the academic portfolio, research publications, and teaching experience of Dr. John Doe..."
                rows={3}
              />
              <p className="text-xs text-slate-500">SEO description for search engines (150-160 characters)</p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
