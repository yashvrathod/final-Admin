import { Card, CardContent } from "@/components/ui/card"

interface AboutData {
  title: string
  description: string | null
  imageUrl: string | null
}

interface TimelineItem {
  year: string
  title: string
  description: string | null
}

interface Stat {
  label: string
  value: string
  icon: string | null
}

interface AboutSectionProps {
  data: AboutData
  timeline: TimelineItem[]
  stats: Stat[]
}

export function AboutSection({ data, timeline, stats }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">{data.title}</h2>
          {data.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center text-pretty">
              {data.description}
            </p>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Timeline</h3>
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex-shrink-0 w-32 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
