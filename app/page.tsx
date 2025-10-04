import { prisma } from "@/lib/prisma"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { CorporateSection } from "@/components/sections/corporate-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

async function getPageData() {
  const [
    siteSettings,
    navItems,
    hero,
    about,
    timeline,
    stats,
    interests,
    skills,
    teaching,
    certifications,
    talks,
    projects,
    journals,
    conferences,
    books,
    patents,
    corporate,
    testimonials,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navItem.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.heroSection.findFirst(),
    prisma.aboutSection.findFirst(),
    prisma.timelineItem.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.stat.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.academicInterest.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.skill.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.teaching.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.certification.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.talk.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.journal.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.conference.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.book.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.patent.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.corporateConnection.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
  ])

  return {
    siteSettings,
    navItems,
    hero,
    about,
    timeline,
    stats,
    interests,
    skills,
    teaching,
    certifications,
    talks,
    projects,
    journals,
    conferences,
    books,
    patents,
    corporate,
    testimonials,
  }
}

export default async function HomePage() {
  const data = await getPageData()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar items={data.navItems} siteName={data.siteSettings?.siteName || "Academic Portfolio"} />
      <main>
        {data.hero && <HeroSection data={data.hero} />}
        {data.about && <AboutSection data={data.about} timeline={data.timeline} stats={data.stats} />}
        <PortfolioSection
          interests={data.interests}
          skills={data.skills}
          teaching={data.teaching}
          certifications={data.certifications}
          talks={data.talks}
          projects={data.projects}
          journals={data.journals}
          conferences={data.conferences}
          books={data.books}
          patents={data.patents}
        />
        {data.corporate.length > 0 && <CorporateSection data={data.corporate} />}
        {data.testimonials.length > 0 && <TestimonialsSection data={data.testimonials} />}
        <ContactSection />
      </main>
      <Footer siteName={data.siteSettings?.siteName || "Academic Portfolio"} />
    </div>
  )
}
