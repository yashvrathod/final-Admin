import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Mail, Award, Briefcase, MessageSquare, GraduationCap } from "lucide-react"

async function getDashboardStats() {
  const [
    journalsCount,
    conferencesCount,
    booksCount,
    patentsCount,
    projectsCount,
    testimonialsCount,
    contactSubmissionsCount,
    teachingCount,
  ] = await Promise.all([
    prisma.journal.count(),
    prisma.conference.count(),
    prisma.book.count(),
    prisma.patent.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.teaching.count(),
  ])

  return {
    journalsCount,
    conferencesCount,
    booksCount,
    patentsCount,
    projectsCount,
    testimonialsCount,
    contactSubmissionsCount,
    teachingCount,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: "Journal Publications",
      value: stats.journalsCount,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Conference Papers",
      value: stats.conferencesCount,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Books & Chapters",
      value: stats.booksCount,
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Patents",
      value: stats.patentsCount,
      icon: Award,
      color: "text-orange-600",
    },
    {
      title: "Projects",
      value: stats.projectsCount,
      icon: Briefcase,
      color: "text-cyan-600",
    },
    {
      title: "Teaching Courses",
      value: stats.teachingCount,
      icon: GraduationCap,
      color: "text-indigo-600",
    },
    {
      title: "Testimonials",
      value: stats.testimonialsCount,
      icon: MessageSquare,
      color: "text-pink-600",
    },
    {
      title: "Unread Messages",
      value: stats.contactSubmissionsCount,
      icon: Mail,
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome to your CMS dashboard. Manage all your content from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/journals"
              className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">Add Publication</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Create a new journal or conference paper
              </p>
            </a>
            <a
              href="/admin/projects"
              className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">Add Project</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Showcase a new research project</p>
            </a>
            <a
              href="/admin/contact"
              className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">View Messages</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check contact form submissions</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
