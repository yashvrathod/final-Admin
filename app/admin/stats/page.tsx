import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getStats() {
  return await prisma.stat.findMany({
    orderBy: { order: "asc" },
  })
}

async function createStat(formData: FormData) {
  "use server"

  const label = formData.get("label") as string
  const value = formData.get("value") as string
  const icon = formData.get("icon") as string

  const maxOrder = await prisma.stat.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.stat.create({
    data: {
      label,
      value,
      icon,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/stats")
}

async function deleteStat(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.stat.delete({ where: { id } })
  revalidatePath("/admin/stats")
}

async function toggleStat(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.stat.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/stats")
}

export default async function StatsPage() {
  const stats = await getStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stats</h1>
        <p className="text-slate-500">Manage your achievement statistics</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Stat</CardTitle>
          <CardDescription>Add a new statistic to showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createStat} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" name="label" placeholder="Publications" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input id="value" name="value" placeholder="50+" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (optional)</Label>
                <Input id="icon" name="icon" placeholder="BookOpen" />
              </div>
            </div>

            <Button type="submit">Add Stat</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Manage existing stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.length === 0 ? (
              <p className="text-sm text-slate-500">No stats yet</p>
            ) : (
              stats.map((stat) => (
                <div key={stat.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{stat.label}</div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleStat}>
                      <input type="hidden" name="id" value={stat.id} />
                      <input type="hidden" name="isActive" value={String(stat.isActive)} />
                      <Switch checked={stat.isActive} />
                    </form>
                    <form action={deleteStat}>
                      <input type="hidden" name="id" value={stat.id} />
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
