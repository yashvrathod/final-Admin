import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"

async function getBooks() {
  return await prisma.book.findMany({
    orderBy: { order: "asc" },
  })
}

async function createBook(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const authors = formData.get("authors") as string
  const publisher = formData.get("publisher") as string
  const year = formData.get("year") as string
  const isbn = formData.get("isbn") as string
  const url = formData.get("url") as string
  const description = formData.get("description") as string
  const coverUrl = formData.get("coverUrl") as string

  const maxOrder = await prisma.book.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  await prisma.book.create({
    data: {
      title,
      authors,
      publisher,
      year,
      isbn,
      url,
      description,
      coverUrl,
      order: (maxOrder?.order || 0) + 1,
    },
  })

  revalidatePath("/admin/books")
}

async function deleteBook(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  await prisma.book.delete({ where: { id } })
  revalidatePath("/admin/books")
}

async function toggleBook(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const isActive = formData.get("isActive") === "true"

  await prisma.book.update({
    where: { id },
    data: { isActive: !isActive },
  })

  revalidatePath("/admin/books")
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Books & Chapters</h1>
        <p className="text-slate-500">Manage your published books and book chapters</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Book</CardTitle>
          <CardDescription>Add a new book or book chapter</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createBook} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" name="title" placeholder="Introduction to Machine Learning" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authors">Authors</Label>
              <Input id="authors" name="authors" placeholder="Smith, J., Doe, A." required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input id="publisher" name="publisher" placeholder="MIT Press" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" placeholder="2024" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" name="isbn" placeholder="978-0-262-xxxxx-x" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverUrl">Cover Image URL</Label>
              <Input id="coverUrl" name="coverUrl" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Book description..." rows={4} />
            </div>

            <Button type="submit">Add Book</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Books List</CardTitle>
          <CardDescription>Manage existing books</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {books.length === 0 ? (
              <p className="text-sm text-slate-500">No books yet</p>
            ) : (
              books.map((book) => (
                <div key={book.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{book.title}</div>
                    <div className="text-sm text-slate-500">{book.authors}</div>
                    <div className="text-sm text-slate-500">
                      {book.publisher} {book.year && `(${book.year})`}
                    </div>
                    {book.isbn && <div className="text-sm text-slate-500">ISBN: {book.isbn}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleBook}>
                      <input type="hidden" name="id" value={book.id} />
                      <input type="hidden" name="isActive" value={String(book.isActive)} />
                      <Switch checked={book.isActive} />
                    </form>
                    <form action={deleteBook}>
                      <input type="hidden" name="id" value={book.id} />
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
