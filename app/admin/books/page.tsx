import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionWrapper from "@/components/SectionWrapper";

async function getBooks() {
  const books = await prisma.book.findMany({ orderBy: { order: "asc" } });
  const bookChapters = await prisma.bookChapter.findMany({
    orderBy: { order: "asc" },
  });
  return { books, bookChapters };
}

// --- BOOKS HANDLERS ---
async function createBook(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const course = formData.get("course") as string;
  const authors = formData.get("authors") as string;
  const publisher = formData.get("publisher") as string;
  const year = formData.get("year") as string;
  const isbn = formData.get("isbn") as string;
  const link = formData.get("link") as string;
  const description = formData.get("description") as string;
  const coverUrl = formData.get("coverUrl") as string;

  const maxOrder = await prisma.book.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.book.create({
    data: {
      title,
      course,
      authors,
      publisher,
      year,
      isbn,
      link,
      description,
      coverUrl,
      order: (maxOrder?.order || 0) + 1,
    },
  });

  revalidatePath("/admin/books");
}

async function toggleBook(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.book.update({ where: { id }, data: { isActive: !isActive } });
  revalidatePath("/admin/books");
}

async function deleteBook(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin/books");
}

// --- BOOK CHAPTER HANDLERS ---
async function createBookChapter(formData: FormData) {
  "use server";
  const year = formData.get("year") as string;
  const chapterTitle = formData.get("chapterTitle") as string;
  const bookTitle = formData.get("bookTitle") as string;
  const doi = formData.get("doi") as string;
  const doiLink = formData.get("doiLink") as string;
  const isbn = formData.get("isbn") as string;
  const coAuthors = formData.get("coAuthors") as string;
  const scopusLink = formData.get("scopusLink") as string;
  const crossrefLink = formData.get("crossrefLink") as string;

  const maxOrder = await prisma.bookChapter.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.bookChapter.create({
    data: {
      year,
      chapterTitle,
      bookTitle,
      doi,
      doiLink,
      isbn,
      coAuthors,
      scopusLink,
      crossrefLink,
      order: (maxOrder?.order || 0) + 1,
    },
  });

  revalidatePath("/admin/books");
}

async function toggleBookChapter(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.bookChapter.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin/books");
}

async function deleteBookChapter(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.bookChapter.delete({ where: { id } });
  revalidatePath("/admin/books");
}

// --- PAGE ---
export default async function BooksPage() {
  const { books, bookChapters } = await getBooks();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Books & Chapters</h1>
        <p className="text-slate-500">
          Manage your published books and book chapters
        </p>
      </div>

      {/* --- ADD BOOK --- */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add Book</h2>
        </CardHeader>
        <CardContent>
          <form action={createBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" name="course" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authors">Authors</Label>
                <Input id="authors" name="authors" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input id="publisher" name="publisher" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" name="isbn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input id="link" name="link" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="coverUrl">Cover Image URL</Label>
                <Input id="coverUrl" name="coverUrl" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={4} />
              </div>
            </div>
            <Button type="submit">Add Book</Button>
          </form>
        </CardContent>
      </Card>

      {/* --- BOOKS LIST --- */}
      <SectionWrapper title="Books">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={`flex flex-col justify-between rounded-lg shadow-lg p-4 border ${
                index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
              }`}
            >
              <div>
                <h3 className="text-amber-900 font-semibold">{book.title}</h3>
                {book.course && (
                  <p className="text-sm text-slate-500 font-medium">
                    Course: {book.course}
                  </p>
                )}
                <p className="text-sm text-slate-700">{book.authors}</p>
                <p className="text-sm text-slate-500">
                  {book.publisher} {book.year && `(${book.year})`}
                </p>
                {book.isbn && (
                  <p className="text-sm text-slate-500">ISBN: {book.isbn}</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <form action={toggleBook}>
                  <input type="hidden" name="id" value={book.id} />
                  <input
                    type="hidden"
                    name="isActive"
                    value={String(book.isActive)}
                  />
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
          ))}
        </div>
      </SectionWrapper>

      {/* --- ADD BOOK CHAPTER --- */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add Book Chapter</h2>
        </CardHeader>
        <CardContent>
          <form action={createBookChapter} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapterTitle">Chapter Title</Label>
                <Input id="chapterTitle" name="chapterTitle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookTitle">Book Title</Label>
                <Input id="bookTitle" name="bookTitle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doi">DOI</Label>
                <Input id="doi" name="doi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doiLink">DOI Link</Label>
                <Input id="doiLink" name="doiLink" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" name="isbn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coAuthors">Co-Authors</Label>
                <Input id="coAuthors" name="coAuthors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scopusLink">Scopus Link</Label>
                <Input id="scopusLink" name="scopusLink" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crossrefLink">Crossref Link</Label>
                <Input id="crossrefLink" name="crossrefLink" />
              </div>
            </div>
            <Button type="submit">Add Book Chapter</Button>
          </form>
        </CardContent>
      </Card>

      {/* --- BOOK CHAPTERS LIST --- */}
      <SectionWrapper title="Book Chapters">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookChapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className={`flex flex-col justify-between rounded-lg shadow-lg p-4 border ${
                index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
              }`}
            >
              <div>
                <h3 className="text-amber-900 font-semibold">
                  {chapter.chapterTitle}
                </h3>
                <p className="italic text-slate-700">{chapter.bookTitle}</p>
                <p className="text-sm text-slate-500">Year: {chapter.year}</p>
                {chapter.doi && (
                  <p className="text-sm text-slate-500">DOI: {chapter.doi}</p>
                )}
                {chapter.isbn && (
                  <p className="text-sm text-slate-500">ISBN: {chapter.isbn}</p>
                )}
                <p className="text-sm text-slate-500">
                  Co-Authors: {chapter.coAuthors}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <form action={toggleBookChapter}>
                  <input type="hidden" name="id" value={chapter.id} />
                  <input
                    type="hidden"
                    name="isActive"
                    value={String(chapter.isActive)}
                  />
                  <Switch checked={chapter.isActive} />
                </form>
                <form action={deleteBookChapter}>
                  <input type="hidden" name="id" value={chapter.id} />
                  <Button type="submit" variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
