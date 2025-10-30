"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import VisitorCounter from "../VisitorCounter";
import VisitsStats from "../VisitsStats";
// import VisitorCounter from "@/components/VisitorCounter";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-amber-100 to-yellow-50 pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative diagonal */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-yellow-200/40 to-transparent transform -skew-x-12" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
        {/* Profile */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative group w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden backdrop-blur-lg bg-white/40 shadow-2xl border border-amber-200">
            <Image
              src="/profile11.png"
              alt="Dr. Anup Ingle"
              fill
              className="rounded-full object-cover group-hover:scale-105 transition duration-500"
              priority
            />
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-amber-900">
              Dr. Anup Ingle
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              Assistant Professor, Department of E&TC, VIT, Pune, India
            </p>
            <div className="p-4">
              {/* VisitorCounter */}
              {/* <VisitorCounter /> */}
              <VisitsStats />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 leading-snug mb-6">
            <Typewriter
              words={["Dr. Anup Ingle"]}
              cursor
              typeSpeed={80}
              deleteSpeed={0}
              delaySpeed={1000}
              loop={1}
            />
            <span className="block mt-2">Assistant Professor, E&TC.</span>
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0 text-justify">
            PhD-qualified expert in Electronics and Communication Engineering
            with over 20 years of teaching experience, I am dedicated to
            academic excellence, research, and innovation. Beyond teaching, I
            actively contribute to driving both professional and personal growth
            by providing mentorship, branding strategies, and tailored software
            solutions. My vision is to bridge academia, industry, and technology
            to create impactful, future-ready solutions.
          </p>
          <Link
            href="/media"
            className="inline-block bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition"
          >
            Media Showcase
          </Link>
        </div>
      </div>
    </section>
  );
}
