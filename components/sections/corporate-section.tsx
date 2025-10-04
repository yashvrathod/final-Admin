import { Card, CardContent } from "@/components/ui/card"

interface CorporateConnection {
  company: string
  role: string | null
  duration: string | null
  description: string | null
  logoUrl: string | null
}

interface CorporateSectionProps {
  data: CorporateConnection[]
}

export function CorporateSection({ data }: CorporateSectionProps) {
  return (
    <section id="corporate" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Corporate Connections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((connection, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                {connection.logoUrl && (
                  <img
                    src={connection.logoUrl || "/placeholder.svg"}
                    alt={connection.company}
                    className="h-12 mb-4 object-contain"
                  />
                )}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{connection.company}</h3>
                {connection.role && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{connection.role}</p>
                )}
                {connection.duration && (
                  <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">{connection.duration}</p>
                )}
                {connection.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">{connection.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
