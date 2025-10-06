"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  siteName: string;
}

export function NavbarClient({ items, siteName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(items[0]?.href || "#");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const handleActive = () => {
      const sections = items.map((item) => document.querySelector(item.href));
      const scrollPos = window.scrollY + 120;
      sections.forEach((sec, i) => {
        if (
          sec &&
          sec.offsetTop <= scrollPos &&
          sec.offsetTop + sec.offsetHeight > scrollPos
        ) {
          setActiveSection(items[i].href);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", handleActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", handleActive);
    };
  }, [items]);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-xl"
            : "bg-white/70 backdrop-blur-md"
        }
        rounded-4xl w-[90%] px-6 md:px-9 py-3 border border-amber-100`}
      >
        <div className="flex items-center justify-between gap-x-5">
          <Link
            href="#home"
            className="text-lg md:text-xl font-bold text-amber-800 hover:text-amber-600 transition-colors whitespace-nowrap"
          >
            {siteName}
          </Link>

          <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-100 transition-all font-medium
                ${
                  activeSection === item.href
                    ? "bg-amber-700 text-white"
                    : "bg-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl z-50 flex flex-col space-y-4 md:hidden rounded-b-3xl p-4"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors font-medium text-gray-700
                ${
                  activeSection === item.href
                    ? "bg-amber-100 text-amber-800"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
