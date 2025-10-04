import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("[v0] Starting database seed...")

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
    },
  })
  console.log("[v0] Created admin user:", admin.email)

  // Create site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Dr. Anup Ingle",
      siteTagline: "Academic Portfolio",
      metaTitle: "Dr. Anup Ingle - Academic Portfolio",
      metaDescription: "Academic portfolio showcasing research, publications, and teaching experience",
    },
  })
  console.log("[v0] Created site settings")

  // Create navigation items
  const navItems = [
    { label: "Home", href: "#home", order: 1 },
    { label: "About", href: "#about", order: 2 },
    { label: "Portfolio", href: "#portfolio", order: 3 },
    { label: "Corporate", href: "#corporate", order: 4 },
    { label: "Testimonials", href: "#testimonials", order: 5 },
    { label: "Contact", href: "#contact", order: 6 },
  ]

  for (const item of navItems) {
    await prisma.navItem.upsert({
      where: { id: item.label.toLowerCase() },
      update: {},
      create: {
        id: item.label.toLowerCase(),
        ...item,
      },
    })
  }
  console.log("[v0] Created navigation items")

  // Create hero section
  const hero = await prisma.heroSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "Dr. Anup Ingle",
      subtitle: "Associate Professor",
      description:
        "Passionate educator and researcher dedicated to advancing knowledge in computer science and engineering.",
      ctaText: "View Portfolio",
      ctaLink: "#portfolio",
    },
  })
  console.log("[v0] Created hero section")

  // Create about section
  const about = await prisma.aboutSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "About Me",
      description:
        "With over a decade of experience in academia, I am committed to fostering innovation and excellence in research and teaching.",
    },
  })
  console.log("[v0] Created about section")

  // Create sample timeline items
  const timelineItems = [
    {
      year: "2020-Present",
      title: "Associate Professor",
      description: "Leading research initiatives and mentoring graduate students",
      order: 1,
    },
    {
      year: "2015-2020",
      title: "Assistant Professor",
      description: "Developed new curriculum and established research lab",
      order: 2,
    },
    {
      year: "2012-2015",
      title: "Postdoctoral Researcher",
      description: "Conducted advanced research in machine learning",
      order: 3,
    },
  ]

  for (const item of timelineItems) {
    await prisma.timelineItem.create({ data: item })
  }
  console.log("[v0] Created timeline items")

  // Create sample stats
  const stats = [
    { label: "Publications", value: "50+", order: 1 },
    { label: "Citations", value: "1000+", order: 2 },
    { label: "Students Mentored", value: "100+", order: 3 },
    { label: "Years Experience", value: "15+", order: 4 },
  ]

  for (const stat of stats) {
    await prisma.stat.create({ data: stat })
  }
  console.log("[v0] Created stats")

  console.log("[v0] Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("[v0] Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
