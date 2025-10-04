"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  Navigation,
  User,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Mail,
  FileText,
  Award,
  Presentation,
  FolderKanban,
  BookOpen,
  Newspaper,
  BookMarked,
  Lightbulb,
  Users,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Settings, label: "Site Settings", href: "/admin/site-settings" },
  { icon: Navigation, label: "Navigation", href: "/admin/navigation" },
  { icon: User, label: "Hero Section", href: "/admin/hero" },
  { icon: User, label: "About Section", href: "/admin/about" },
  { icon: FileText, label: "Timeline", href: "/admin/timeline" },
  { icon: Award, label: "Stats", href: "/admin/stats" },
  { icon: Lightbulb, label: "Interests", href: "/admin/interests" },
  { icon: GraduationCap, label: "Skills", href: "/admin/skills" },
  { icon: Presentation, label: "Teaching", href: "/admin/teaching" },
  { icon: Award, label: "Certifications", href: "/admin/certifications" },
  { icon: Presentation, label: "Talks", href: "/admin/talks" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: BookOpen, label: "Journals", href: "/admin/journals" },
  { icon: Newspaper, label: "Conferences", href: "/admin/conferences" },
  { icon: BookMarked, label: "Books", href: "/admin/books" },
  { icon: FileText, label: "Patents", href: "/admin/patents" },
  { icon: Briefcase, label: "Corporate", href: "/admin/corporate" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Mail, label: "Contact Submissions", href: "/admin/contact" },
  { icon: Users, label: "Admin Users", href: "/admin/users" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Academic CMS</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Admin Panel</p>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
