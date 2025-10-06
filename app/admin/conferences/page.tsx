  // app/admin/conferences/page.tsx
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
  import { FiExternalLink } from "react-icons/fi";

  // Fetch conferences at runtime with error handling
  async function getConferences() {
    try {
      return await prisma.conference.findMany({
        orderBy: { order: "asc" },
      });
    } catch (error) {
      console.error("Failed to fetch conferences:", error);
      return [];
    }
  }

  // Create new conference
  async function createConference(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString() || "";
    const authors = formData.get("authors")?.toString() || "";
    const event = formData.get("conference")?.toString() || "";
    const year = formData.get("year")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const doi = formData.get("doi")?.toString() || "";
    const link = formData.get("url")?.toString() || "";
    const abstract = formData.get("abstract")?.toString() || "";

    const maxOrder = await prisma.conference.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    await prisma.conference.create({
      data: {
        title,
        authors,
        event,
        year,
        location,
        doi,
        link,
        abstract,
        order: (maxOrder?.order || 0) + 1,
      },
    });

    revalidatePath("/admin/conferences");
  }

  // Delete a conference
  async function deleteConference(formData: FormData) {
    "use server";

    const id = formData.get("id")?.toString();
    if (!id) return;

    await prisma.conference.delete({ where: { id } });
    revalidatePath("/admin/conferences");
  }

  // Toggle active status
  async function toggleConference(formData: FormData) {
    "use server";

    const id = formData.get("id")?.toString();
    const isActive = formData.get("isActive") === "true";

    if (!id) return;

    await prisma.conference.update({
      where: { id },
      data: { isActive: !isActive },
    });

    revalidatePath("/admin/conferences");
  }

  export default async function ConferencesPage() {
    const conferences = await getConferences();

    return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Conference Papers</h1>
          <p className="text-slate-500">Manage your conference publications</p>
        </div>

        {/* Add Conference Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Conference Paper</CardTitle>
            <CardDescription>Add a new conference publication</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createConference} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Paper Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title of the conference paper"
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
                  <Label htmlFor="conference">Conference Name</Label>
                  <Input
                    id="conference"
                    name="conference"
                    placeholder="ICML 2024"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" placeholder="2024" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Vienna, Austria"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doi">DOI</Label>
                  <Input id="doi" name="doi" placeholder="10.1000/xyz123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" name="url" placeholder="https://..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  name="abstract"
                  placeholder="Paper abstract..."
                  rows={4}
                />
              </div>

              <Button type="submit">Add Paper</Button>
            </form>
          </CardContent>
        </Card>

        {/* Conference List */}
        <Card>
          <CardHeader>
            <CardTitle>Conference Papers List</CardTitle>
            <CardDescription>Manage existing conference papers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conferences.length === 0 ? (
                <p className="text-sm text-slate-500">No conference papers yet</p>
              ) : (
                conferences.map((conf) => (
                  <div
                    key={conf.id}
                    className="border-l-4 border-blue-400 bg-blue-50 rounded-xl p-6 shadow-md space-y-2"
                  >
                    <h3 className="font-semibold text-lg text-blue-900">
                      {conf.title}
                    </h3>
                    <p className="text-sm text-blue-800">{conf.authors}</p>
                    <p className="text-sm text-blue-700">
                      {conf.event} {conf.year && `(${conf.year})`}
                    </p>
                    {conf.location && (
                      <p className="text-sm text-blue-700">{conf.location}</p>
                    )}
                    {conf.doi && (
                      <p className="text-sm text-blue-700">DOI: {conf.doi}</p>
                    )}
                    {conf.link && (
                      <a
                        href={conf.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 hover:underline text-sm font-medium inline-flex items-center"
                      >
                        Paper Link <FiExternalLink className="ml-1" size={14} />
                      </a>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      {/* Toggle Active */}
                      <form action={toggleConference}>
                        <input type="hidden" name="id" value={conf.id} />
                        <input
                          type="hidden"
                          name="isActive"
                          value={String(conf.isActive)}
                        />
                        <Switch checked={conf.isActive} />
                      </form>

                      {/* Delete */}
                      <form action={deleteConference}>
                        <input type="hidden" name="id" value={conf.id} />
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
