import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  })
}

async function createTestimonial(formData: FormData) {
  "use server"

  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const company = formData.get("company") as string
  const content = formData.get("content") as string
  const avatarUrl = formData.get("avatarUrl") as string
  const rating = formData.get("rating") as string

  const maxOrder = await prisma.testimonial.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.testimonial.create({
    data: {
      name,
      role,
      company,
      content,
      avatarUrl,
      rating: rating ? Number.parseInt(rating) : null,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/testimonials")
}

async function deleteTestimonial(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath("/admin/testimonials")
}

async function toggleTestimonial(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.testimonial.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/testimonials")
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-slate-500">Manage testimonials and reviews</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Testimonial</CardTitle>
          <CardDescription>Add a new testimonial or review</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTestimonial} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Title</Label>
                <Input id="role" name="role" placeholder="PhD Student" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company / Institution</Label>
                <Input id="company" name="company" placeholder="MIT" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input id="rating" name="rating" type="number" min="1" max="5" placeholder="5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" name="avatarUrl" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Testimonial Content</Label>
              <Textarea id="content" name="content" placeholder="Write the testimonial..." rows={4} required />
            </div>

            <Button type="submit">Add Testimonial</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials List</CardTitle>
          <CardDescription>Manage existing testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <p className="text-sm text-slate-500">No testimonials yet</p>
            ) : (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{testimonial.name}</div>
                    {testimonial.role && (
                      <div className="text-sm text-slate-500">
                        {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                      </div>
                    )}
                    {testimonial.rating && <div className="text-sm text-primary">Rating: {testimonial.rating}/5</div>}
                    <p className="text-sm text-slate-500 mt-2">{testimonial.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleTestimonial}>
                      <input type="hidden" name="id" value={testimonial.id} />
                      <input type="hidden" name="isActive" value={String(testimonial.isActive)} />
                      <Switch checked={testimonial.isActive} />
                    </form>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={testimonial.id} />
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
