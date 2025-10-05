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

async function getCertifications() {
  return await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });
}

async function createCertification(formData: FormData) {
  "use server";

  const name = formData.get("title") as string;
  const provider = formData.get("issuer") as string;
  const year = formData.get("issueDate") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const credentialId = formData.get("credentialId") as string;
  const credentialUrl = formData.get("credentialUrl") as string;
  const details = formData.get("description") as string;

  const maxOrder = await prisma.certification.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.certification.create({
    data: {
      name,
      provider,
      year,
      details,
      credentialId: credentialId || null,
      credentialUrl: credentialUrl || null,
      expiryDate: expiryDate || null,
      order: (maxOrder?.order || 0) + 1,
      isActive: true,
    },
  });

  revalidatePath("/admin/certifications");
}

async function deleteCertification(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
}

async function toggleCertification(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";

  await prisma.certification.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath("/admin/certifications");
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="text-slate-500">
          Manage your professional certifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Certification</CardTitle>
          <CardDescription>
            Add a new certification or credential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCertification} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certification Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input
                  id="issuer"
                  name="issuer"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  name="issueDate"
                  placeholder="January 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="January 2027"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID</Label>
                <Input
                  id="credentialId"
                  name="credentialId"
                  placeholder="ABC123XYZ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credentialUrl">Credential URL</Label>
                <Input
                  id="credentialUrl"
                  name="credentialUrl"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <Button type="submit">Add Certification</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications List</CardTitle>
          <CardDescription>Manage existing certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.length === 0 ? (
              <p className="text-sm text-slate-500">No certifications yet</p>
            ) : (
              certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-slate-500">{cert.name}</div>
                    {cert.issueDate && (
                      <div className="text-sm text-slate-500">
                        Issued: {cert.issueDate}
                      </div>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleCertification}>
                      <input type="hidden" name="id" value={cert.id} />
                      <input
                        type="hidden"
                        name="isActive"
                        value={String(cert.isActive)}
                      />
                      <Switch checked={cert.isActive} />
                    </form>
                    <form action={deleteCertification}>
                      <input type="hidden" name="id" value={cert.id} />
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
