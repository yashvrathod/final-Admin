interface FooterProps {
  siteName: string
}

export function Footer({ siteName }: FooterProps) {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{siteName}</h3>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
