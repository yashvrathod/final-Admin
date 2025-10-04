"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface PortfolioSectionProps {
  interests: Array<{ title: string; description: string | null }>
  skills: Array<{ name: string; category: string | null }>
  teaching: Array<{ course: string; institution: string; duration: string | null }>
  certifications: Array<{ title: string; issuer: string; issueDate: string | null }>
  talks: Array<{ title: string; event: string; date: string | null }>
  projects: Array<{ title: string; description: string | null; technologies: string | null; projectUrl: string | null }>
  journals: Array<{ title: string; authors: string; journal: string; year: string | null; url: string | null }>
  conferences: Array<{ title: string; authors: string; conference: string; year: string | null; url: string | null }>
  books: Array<{ title: string; authors: string; publisher: string | null; year: string | null }>
  patents: Array<{ title: string; inventors: string; patentNumber: string | null; status: string | null }>
}

export function PortfolioSection({
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
}: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Academic Portfolio</h2>

        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="talks">Talks</TabsTrigger>
            <TabsTrigger value="patents">Patents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Interests */}
            {interests.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Research Interests</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {interests.map((interest, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{interest.title}</CardTitle>
                        {interest.description && <CardDescription>{interest.description}</CardDescription>}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="publications" className="space-y-8">
            {/* Journals */}
            {journals.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Journal Publications</h3>
                <div className="space-y-4">
                  {journals.map((journal, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{journal.title}</CardTitle>
                        <CardDescription>
                          {journal.authors} • {journal.journal} {journal.year && `(${journal.year})`}
                        </CardDescription>
                      </CardHeader>
                      {journal.url && (
                        <CardContent>
                          <a
                            href={journal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            View Publication <ExternalLink className="h-3 w-3" />
                          </a>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Conferences */}
            {conferences.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Conference Papers</h3>
                <div className="space-y-4">
                  {conferences.map((conf, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{conf.title}</CardTitle>
                        <CardDescription>
                          {conf.authors} • {conf.conference} {conf.year && `(${conf.year})`}
                        </CardDescription>
                      </CardHeader>
                      {conf.url && (
                        <CardContent>
                          <a
                            href={conf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            View Paper <ExternalLink className="h-3 w-3" />
                          </a>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Books */}
            {books.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Books & Chapters</h3>
                <div className="space-y-4">
                  {books.map((book, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>
                          {book.authors} • {book.publisher} {book.year && `(${book.year})`}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {projects.map((project, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  {project.description && <CardDescription>{project.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(",").map((tech, i) => (
                        <Badge key={i} variant="outline">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      View Project <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="teaching" className="space-y-4">
            {teaching.map((course, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{course.course}</CardTitle>
                  <CardDescription>
                    {course.institution} {course.duration && `• ${course.duration}`}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}

            {certifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                        <CardDescription>
                          {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="talks" className="space-y-4">
            {talks.map((talk, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{talk.title}</CardTitle>
                  <CardDescription>
                    {talk.event} {talk.date && `• ${talk.date}`}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="patents" className="space-y-4">
            {patents.map((patent, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{patent.title}</CardTitle>
                  <CardDescription>
                    {patent.inventors}
                    {patent.patentNumber && ` • Patent No: ${patent.patentNumber}`}
                    {patent.status && ` • Status: ${patent.status}`}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
