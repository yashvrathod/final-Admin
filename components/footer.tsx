"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { SiGooglescholar, SiOrcid } from "react-icons/si";
import { FaDatabase, FaGlobe } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Left Column: About */}
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">Dr. Anup Ingle</h3>
          <p className="text-sm text-amber-200 leading-relaxed">
            Assistant Professor in Electronics & Telecommunication Engineering
            with expertise in Network Security, IoT, and AI/ML. Passionate about
            research and student mentorship.
          </p>
        </div>

        {/* Center Column: Academic Resources */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold text-white mb-3">
            Academic Resources
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              {
                href: "https://scholar.google.com/citations?user=rz3NE4kAAAAJ&hl=en",
                label: "Google Scholar",
                icon: (
                  <SiGooglescholar size={16} className="mr-2 text-amber-200" />
                ),
              },
              {
                href: "https://www.scopus.com/authid/detail.uri?authorId=59007402600",
                label: "Scopus",
                icon: <FaDatabase size={16} className="mr-2 text-amber-200" />,
              },
              {
                href: "https://www.webofscience.com/wos/author/record/HLX-4154-2023",
                label: "Web of Science",
                icon: <FaGlobe size={16} className="mr-2 text-amber-200" />,
              },
              {
                href: "https://orcid.org/0000-0003-1159-9453 ",
                label: "ORCID",
                icon: <SiOrcid size={16} className="mr-2 text-amber-200" />,
              },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Contact + Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Connect With Me
          </h4>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex items-center gap-2 text-amber-200">
              <Mail size={16} />
              <Link
                href="mailto:anup.ingle@vit.edu"
                className="hover:text-amber-400 transition"
              >
                anup.ingle@vit.edu (Official)
              </Link>
            </div>
            <div className="flex items-center gap-2 text-amber-200">
              <Mail size={16} />
              <Link
                href="mailto:anupingle@gmail.com"
                className="hover:text-amber-400 transition"
              >
                anupingle@gmail.com (Personal)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-amber-200 mt-10 border-t border-amber-700 pt-4">
        &copy; {new Date().getFullYear()} Dr. Anup Ingle. All rights reserved.
      </div>
    </footer>
  );
}
