"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  siteName: string;
}

export function Navbar({ items, siteName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[80%] px-6 py-2 rounded-3xl border border-amber-200 bg-white/90 backdrop-blur-lg shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg md:text-xl font-bold text-amber-800 hover:text-amber-600 transition-colors"
        >
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm md:text-base font-medium text-amber-800 hover:text-amber-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-white/90 backdrop-blur-lg p-3 rounded-xl shadow-md">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
