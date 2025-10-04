import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getCorporateConnections() {
  return await prisma.corporateConnection.findMany({
    orderBy: { order: "asc" },
  })
}

async function createCorporateConnection(formData: FormData) {
  "use server"

  const company = formData.get("company") as string
  const role = formData.get("role") as string
  const duration = formData.get("duration") as string
  const description = formData.get("description") as string
  const logoUrl = formData.get("logoUrl") as string

  const maxOrder = await prisma.corporateConnection.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.corporateConnection.create({
    data: {
      company,
      role,
      duration,
      description,
      logoUrl,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/corporate")
}

async function deleteCorporateConnection(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.corporateConnection.delete({ where: { id } })
  revalidatePath("/admin/corporate")
}

async function toggleCorporateConnection(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.corporateConnection.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/corporate")
}

export default async function CorporatePage() {
  const connections = await getCorporateConnections()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Corporate Connections</h1>
        <p className="text-slate-500">Manage your industry partnerships and collaborations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Corporate Connection</CardTitle>
          <CardDescription>Add a new corporate partnership or collaboration</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCorporateConnection} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" placeholder="Google" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Position</Label>
                <Input id="role" name="role" placeholder="Research Consultant" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" name="duration" placeholder="2023 - Present" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Company Logo URL</Label>
              <Input id="logoUrl" name="logoUrl" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Details about the collaboration..." rows={3} />
            </div>

            <Button type="submit">Add Connection</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Corporate Connections List</CardTitle>
          <CardDescription>Manage existing corporate connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connections.length === 0 ? (
              <p className="text-sm text-slate-500">No corporate connections yet</p>
            ) : (
              connections.map((connection) => (
                <div key={connection.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{connection.company}</div>
                    {connection.role && <div className="text-sm text-slate-500">{connection.role}</div>}
                    {connection.duration && <div className="text-sm text-slate-500">{connection.duration}</div>}
                    {connection.description && <p className="text-sm text-slate-500 mt-1">{connection.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleCorporateConnection}>
                      <input type="hidden" name="id" value={connection.id} />
                      <input type="hidden" name="isActive" value={String(connection.isActive)} />
                      <Switch checked={connection.isActive} />
                    </form>
                    <form action={deleteCorporateConnection}>
                      <input type="hidden" name="id" value={connection.id} />
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
