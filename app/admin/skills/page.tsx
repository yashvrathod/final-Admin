import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

// Fetch all sections
async function getSections() {
  return await prisma.skillSection.findMany({
    orderBy: { order: "asc" },
  });
}

// Create a new section
async function createSection(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const icon = formData.get("icon") as string;
  const color = formData.get("color") as string;
  const itemsRaw = formData.get("items") as string;

  const items = itemsRaw
    ? itemsRaw
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const maxOrder = await prisma.skillSection.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.skillSection.create({
    data: {
      title,
      icon,
      color,
      items,
      order: (maxOrder?.order || 0) + 1,
    },
  });

  revalidatePath("/admin/skills");
}

// Delete a section
async function deleteSection(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.skillSection.delete({ where: { id } });
  revalidatePath("/admin/skills");
}

// Toggle active status
async function toggleSection(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";

  await prisma.skillSection.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath("/admin/skills");
}

export default async function SkillsPage() {
  const sections = await getSections();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skill Sections</h1>
        <p className="text-slate-500">
          Manage categorized technical and academic skills
        </p>
      </div>

      {/* Add Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add Skill Section</CardTitle>
          <CardDescription>
            Add a new skill category with multiple skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createSection} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Network Skills"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input id="icon" name="icon" placeholder="FiWifi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color (Tailwind classes)</Label>
                <Input
                  id="color"
                  name="color"
                  placeholder="bg-yellow-50 border-yellow-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items (comma-separated)</Label>
                <Input
                  id="items"
                  name="items"
                  placeholder="LAN Configuration, Network Programming, Wireshark"
                />
              </div>
            </div>

            <Button type="submit">Add Section</Button>
          </form>
        </CardContent>
      </Card>

      {/* List of Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Sections List</CardTitle>
          <CardDescription>
            Manage your existing skill categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.length === 0 ? (
              <p className="text-sm text-slate-500">No sections yet</p>
            ) : (
              sections.map((section) => (
                <div
                  key={section.id}
                  className="flex flex-col gap-2 p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-lg">{section.title}</div>
                      <div className="text-sm text-slate-500">
                        {section.icon && <span>Icon: {section.icon} • </span>}
                        {section.color}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <form action={toggleSection}>
                        <input type="hidden" name="id" value={section.id} />
                        <input
                          type="hidden"
                          name="isActive"
                          value={String(section.isActive)}
                        />
                        <Switch checked={section.isActive} />
                      </form>
                      <form action={deleteSection}>
                        <input type="hidden" name="id" value={section.id} />
                        <Button type="submit" variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>

                  {/* Skill items list */}
                  {section.items.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-slate-600">
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
