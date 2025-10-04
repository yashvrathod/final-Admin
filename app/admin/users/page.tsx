import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { hash } from "bcryptjs"

async function getAdminUsers() {
  return await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
  })
}

async function createAdminUser(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as string

  const hashedPassword = await hash(password, 10)

  await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || "admin",
    },
  })

  revalidatePath("/admin/users")
}

async function deleteAdminUser(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.adminUser.delete({ where: { id } })
  revalidatePath("/admin/users")
}

export default async function AdminUsersPage() {
  const users = await getAdminUsers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <p className="text-slate-500">Manage admin user accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Admin User</CardTitle>
          <CardDescription>Create a new admin user account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAdminUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" placeholder="admin" defaultValue="admin" />
              </div>
            </div>

            <Button type="submit">Add Admin User</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users List</CardTitle>
          <CardDescription>Manage existing admin users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-sm text-slate-500">No admin users yet</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-slate-500">{user.email}</div>
                    <div className="text-sm text-slate-500">Role: {user.role}</div>
                  </div>
                  <form action={deleteAdminUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <Button type="submit" variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
