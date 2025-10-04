import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface HeroData {
  title: string
  subtitle: string | null
  description: string | null
  imageUrl: string | null
  ctaText: string | null
  ctaLink: string | null
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {data.imageUrl && (
            <div className="mb-8 flex justify-center">
              <img
                src={data.imageUrl || "/placeholder.svg"}
                alt={data.title}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
            {data.title}
          </h1>
          {data.subtitle && <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{data.subtitle}</p>}
          {data.description && (
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-pretty">
              {data.description}
            </p>
          )}
          {data.ctaText && data.ctaLink && (
            <Button asChild size="lg">
              <Link href={data.ctaLink}>
                {data.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
