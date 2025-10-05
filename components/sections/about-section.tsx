"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

interface AboutData {
  title: string;
  description: string | null;
  imageUrl: string | null;
}

interface TimelineItem {
  title: string;
  description: string | null;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface AboutSectionProps {
  data: AboutData;
  timeline: TimelineItem[];
  stats: Stat[];
}

interface StatCardProps extends Stat {}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    viewport={{ once: true }}
    className="bg-yellow-100 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border border-yellow-300 hover:shadow-xl hover:scale-105 transition-transform cursor-pointer relative"
  >
    <div className="text-amber-700 text-3xl sm:text-4xl mb-4 sm:mb-5 flex justify-center">
      {icon}
    </div>
    <div className="font-semibold text-stone-800 text-lg sm:text-xl mb-2 sm:mb-3 text-center">
      {value}
    </div>
    <div className="text-yellow-900 text-sm sm:text-base leading-relaxed text-center">
      {label}
    </div>
  </motion.div>
);

export function AboutSection({ data, timeline, stats }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="bg-yellow-50 py-16 px-4 sm:px-8 md:px-20 border-t border-yellow-200 shadow-inner"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-amber-900 mb-10 sm:mb-14 tracking-wide"
        >
          {data.title}
        </motion.h2>

        {/* Intro Text */}
        {data.description && (
          <motion.p
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-yellow-900 w-full max-w-5xl mx-auto mb-10 sm:mb-14 leading-relaxed text-justify px-2"
          >
            {data.description}
          </motion.p>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="bg-yellow-100 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border border-yellow-300 hover:shadow-xl hover:scale-105 transition-transform cursor-pointer relative"
              >
                {/* Icon */}
                <div className="text-amber-700 text-3xl sm:text-4xl mb-4 sm:mb-5 flex justify-center">
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="font-semibold text-stone-800 text-lg sm:text-xl mb-2 sm:mb-3 text-center">
                  {item.title}
                </h4>

                {/* Description */}
                {item.description && (
                  <p className="text-yellow-900 text-sm sm:text-base leading-relaxed text-center">
                    {item.description}
                  </p>
                )}

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 text-amber-600">
                  <FaArrowRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mb-16 md:mb-24">
            {stats.map((item, idx) => (
              <StatCard key={idx} {...item} />
            ))}
          </div>
        )}

        {/* Contact Buttons */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center items-center md:gap-6 gap-4"
        >
          {/* Email */}
          <a
            href="mailto:anupingle@gmail.com"
            className="flex items-center gap-3 px-8 py-3 bg-amber-600 text-white rounded-full text-lg font-medium shadow hover:bg-amber-700 transition"
          >
            <FaEnvelope size={24} /> Email
          </a>

          {/* WhatsApp */}
          <a
            href="tel:+919325383604"
            className="flex items-center gap-3 px-8 py-3 bg-white border border-amber-600 text-amber-800 rounded-full text-lg font-medium shadow hover:bg-yellow-100 transition"
          >
            <FaPhoneAlt size={24} /> WhatsApp
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dr-anup-ingle-bb56a1148/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-3 bg-yellow-100 border border-amber-300 text-amber-900 rounded-full text-lg font-medium shadow hover:bg-yellow-200 transition"
          >
            <FaLinkedin size={24} /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
