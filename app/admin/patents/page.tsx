import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getPatents() {
  return await prisma.patent.findMany({
    orderBy: { order: "asc" },
  })
}

async function createPatent(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const inventors = formData.get("inventors") as string
  const patentNumber = formData.get("patentNumber") as string
  const filingDate = formData.get("filingDate") as string
  const grantDate = formData.get("grantDate") as string
  const status = formData.get("status") as string
  const url = formData.get("url") as string
  const description = formData.get("description") as string

  const maxOrder = await prisma.patent.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.patent.create({
    data: {
      title,
      inventors,
      patentNumber,
      filingDate,
      grantDate,
      status,
      url,
      description,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/patents")
}

async function deletePatent(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.patent.delete({ where: { id } })
  revalidatePath("/admin/patents")
}

async function togglePatent(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.patent.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/patents")
}

export default async function PatentsPage() {
  const patents = await getPatents()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Patents</h1>
        <p className="text-slate-500">Manage your patent portfolio</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Patent</CardTitle>
          <CardDescription>Add a new patent or patent application</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPatent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Patent Title</Label>
              <Input id="title" name="title" placeholder="Method and System for..." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventors">Inventors</Label>
              <Input id="inventors" name="inventors" placeholder="Smith, J., Doe, A." required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patentNumber">Patent Number</Label>
                <Input id="patentNumber" name="patentNumber" placeholder="US 10,123,456 B2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" name="status" placeholder="Granted / Pending" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filingDate">Filing Date</Label>
                <Input id="filingDate" name="filingDate" placeholder="January 15, 2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grantDate">Grant Date</Label>
                <Input id="grantDate" name="grantDate" placeholder="March 20, 2024" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Patent URL</Label>
              <Input id="url" name="url" placeholder="https://patents.google.com/..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Patent description..." rows={4} />
            </div>

            <Button type="submit">Add Patent</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patents List</CardTitle>
          <CardDescription>Manage existing patents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patents.length === 0 ? (
              <p className="text-sm text-slate-500">No patents yet</p>
            ) : (
              patents.map((patent) => (
                <div key={patent.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{patent.title}</div>
                    <div className="text-sm text-slate-500">{patent.inventors}</div>
                    {patent.patentNumber && <div className="text-sm text-slate-500">Patent: {patent.patentNumber}</div>}
                    {patent.status && <div className="text-sm text-primary">Status: {patent.status}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={togglePatent}>
                      <input type="hidden" name="id" value={patent.id} />
                      <input type="hidden" name="isActive" value={String(patent.isActive)} />
                      <Switch checked={patent.isActive} />
                    </form>
                    <form action={deletePatent}>
                      <input type="hidden" name="id" value={patent.id} />
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
