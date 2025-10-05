import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

// Fetch data
async function getJournals() {
  return prisma.journal.findMany({
    orderBy: { order: "asc" },
  });
}

// Create
async function createJournal(formData: FormData) {
  "use server";

  const title = formData.get("title")?.toString() ?? "";
  const authors = formData.get("authors")?.toString() ?? "";
  const journalName = formData.get("journal")?.toString() ?? "";
  const type =
    (formData.get("type")?.toString() as "international" | "national") ??
    "international";
  const year = formData.get("year")?.toString() ?? "";
  const volume = formData.get("volume")?.toString() ?? "";
  const issue = formData.get("issue")?.toString() ?? "";
  const pages = formData.get("pages")?.toString() ?? "";
  const doi = formData.get("doi")?.toString() ?? "";
  const link = formData.get("link")?.toString() ?? "";
  const abstract = formData.get("abstract")?.toString() ?? "";
  const details = formData.get("details")?.toString() ?? "";

  const maxOrder = await prisma.journal.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.journal.create({
    data: {
      title,
      authors,
      journal: journalName,
      type,
      year,
      volume,
      issue,
      pages,
      doi,
      link,
      abstract,
      details,
      order: (maxOrder?.order || 0) + 1,
    },
  });

  revalidatePath("/admin/journals");
}

// Delete
async function deleteJournal(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.journal.delete({ where: { id } });
  revalidatePath("/admin/journals");
}

// Toggle
async function toggleJournal(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  const isActive = formData.get("isActive") === "true";
  if (!id) return;

  await prisma.journal.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath("/admin/journals");
}

// Page
export default async function JournalsPage() {
  const journals = await getJournals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Journal Publications</h1>
        <p className="text-slate-500">Manage your published journal articles</p>
      </div>

      {/* Add Journal Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Journal Publication</CardTitle>
          <CardDescription>Add a new journal article</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createJournal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title of the research paper"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authors">Authors</Label>
              <Input
                id="authors"
                name="authors"
                placeholder="Smith, J., Doe, A., et al."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="journal">Journal Name</Label>
                <Input
                  id="journal"
                  name="journal"
                  placeholder="Nature"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  className="border rounded p-2 w-full"
                >
                  <option value="international">International</option>
                  <option value="national">National</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" placeholder="2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" name="volume" placeholder="42" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue">Issue</Label>
                <Input id="issue" name="issue" placeholder="3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pages">Pages</Label>
                <Input id="pages" name="pages" placeholder="123-145" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doi">DOI</Label>
                <Input id="doi" name="doi" placeholder="10.1000/xyz123" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input id="link" name="link" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea
                id="abstract"
                name="abstract"
                placeholder="Article abstract..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Full article details..."
                rows={3}
              />
            </div>

            <Button type="submit">Add Publication</Button>
          </form>
        </CardContent>
      </Card>

      {/* List of Journals */}
      <Card>
        <CardHeader>
          <CardTitle>Publications List</CardTitle>
          <CardDescription>
            Manage existing journal publications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journals.length === 0 ? (
              <p className="text-sm text-slate-500">No publications yet</p>
            ) : (
              journals.map((journal) => (
                <div
                  key={journal.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{journal.title}</div>
                    <div className="text-sm text-slate-500">
                      {journal.authors}
                    </div>
                    <div className="text-sm text-slate-500">
                      {journal.journal} {journal.year && `(${journal.year})`} •{" "}
                      {journal.type}
                    </div>
                    {journal.doi && (
                      <div className="text-sm text-primary">
                        DOI: {journal.doi}
                      </div>
                    )}
                    {journal.link && (
                      <div className="text-sm text-blue-600 underline">
                        <a
                          href={journal.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {journal.link}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleJournal}>
                      <input type="hidden" name="id" value={journal.id} />
                      <input
                        type="hidden"
                        name="isActive"
                        value={String(journal.isActive)}
                      />
                      <Switch checked={journal.isActive} />
                    </form>
                    <form action={deleteJournal}>
                      <input type="hidden" name="id" value={journal.id} />
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
  );
}
