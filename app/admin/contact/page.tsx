import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail } from "lucide-react"

async function getContactSubmissions() {
  return await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })
}

async function markAsRead(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isRead = formData.get("isRead") === "true"

  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: !isRead },
  })

  revalidatePath("/admin/contact")
}

async function deleteSubmission(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.contactSubmission.delete({ where: { id } })
  revalidatePath("/admin/contact")
}

export default async function ContactPage() {
  const submissions = await getContactSubmissions()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-slate-500">View and manage contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>{submissions.filter((s) => !s.isRead).length} unread messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <p className="text-sm text-slate-500">No contact submissions yet</p>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-4 border rounded-lg ${!submission.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{submission.name}</div>
                        {!submission.isRead && <Badge variant="default">New</Badge>}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {submission.email}
                      </div>
                      {submission.subject && (
                        <div className="text-sm font-medium mt-2">Subject: {submission.subject}</div>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{submission.message}</p>
                      <div className="text-xs text-slate-400 mt-2">
                        {new Date(submission.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={submission.id} />
                        <input type="hidden" name="isRead" value={String(submission.isRead)} />
                        <Button type="submit" variant="outline" size="sm">
                          {submission.isRead ? "Mark Unread" : "Mark Read"}
                        </Button>
                      </form>
                      <form action={deleteSubmission}>
                        <input type="hidden" name="id" value={submission.id} />
                        <Button type="submit" variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
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
