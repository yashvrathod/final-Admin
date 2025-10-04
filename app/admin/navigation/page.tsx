import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { revalidatePath } from "next/cache"
import { Trash2, Plus, GripVertical } from "lucide-react"

async function getNavItems() {
  const items = await prisma.navItem.findMany({
    orderBy: { order: "asc" },
  })
  return items
}

async function createNavItem(formData: FormData) {
  "use server"

  const label = formData.get("label") as string
  const href = formData.get("href") as string

  const maxOrder = await prisma.navItem.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.navItem.create({
    data: {
      label,
      href,
      order: (maxOrder?.order || 0) + 1,
      isActive: true,
    },
  })

  revalidatePath("/admin/navigation")
  revalidatePath("/")
}

async function deleteNavItem(formData: FormData) {
  "use server"

  const id = formData.get("id") as string

  await prisma.navItem.delete({
    where: { id },
  })

  revalidatePath("/admin/navigation")
  revalidatePath("/")
}

async function toggleNavItem(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.navItem.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/navigation")
  revalidatePath("/")
}

async function updateNavItem(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const label = formData.get("label") as string
  const href = formData.get("href") as string

  await prisma.navItem.update({
    where: { id },
    data: { label, href },
  })

  revalidatePath("/admin/navigation")
  revalidatePath("/")
}

export default async function NavigationPage() {
  const navItems = await getNavItems()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Navigation Menu</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your website's navigation menu items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Item */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Item
            </CardTitle>
            <CardDescription>Create a new navigation menu item</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createNavItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label *</Label>
                <Input id="label" name="label" placeholder="Home" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="href">Link (href) *</Label>
                <Input id="href" name="href" placeholder="/" required />
                <p className="text-xs text-slate-500">Use # for anchor links (e.g., #about)</p>
              </div>

              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Items */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Navigation Items</CardTitle>
            <CardDescription>Manage existing menu items (drag to reorder)</CardDescription>
          </CardHeader>
          <CardContent>
            {navItems.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No navigation items yet. Add your first item to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900"
                  >
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-move" />

                    <form action={updateNavItem} className="flex-1 flex items-center gap-3">
                      <input type="hidden" name="id" value={item.id} />
                      <Input name="label" defaultValue={item.label} className="flex-1" placeholder="Label" />
                      <Input name="href" defaultValue={item.href} className="flex-1" placeholder="Link" />
                      <Button type="submit" size="sm" variant="outline">
                        Save
                      </Button>
                    </form>

                    <form action={toggleNavItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="isActive" value={item.isActive.toString()} />
                      <Button type="submit" size="sm" variant={item.isActive ? "default" : "outline"}>
                        {item.isActive ? "Active" : "Inactive"}
                      </Button>
                    </form>

                    <form action={deleteNavItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <Button type="submit" size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
