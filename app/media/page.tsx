"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-static";

// Now images have description
const images = [
  { src: "/media1 (2).jpeg", description: "Description for Media 1" },
  { src: "/media2 (2).jpeg", description: "Description for Media 2" },
  { src: "/media3 (2).jpeg", description: "Description for Media 3" },
  { src: "/media4 (2).jpeg", description: "Description for Media 4" },
  { src: "/media5.jpeg", description: "Description for Media 5" },
  { src: "/media6.jpeg", description: "Description for Media 6" },
  { src: "/media7.jpeg", description: "Description for Media 7" },
];

export default function MediaShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 px-6 py-10">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-amber-900 mb-12 text-center drop-shadow-lg"
      >
        ✨ Media Gallery
      </motion.h1>

      {/* Uniform Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {images.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={item.src}
              alt={`Media ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-[250px] object-cover"
            />

            {/* Hover description */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
              {item.description}
            </div>

            <span className="absolute bottom-3 right-3 text-xs bg-amber-100/90 text-amber-800 px-2 py-0.5 rounded-full shadow-sm">
              #{index + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={`Media ${selectedIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
              >
                ✕
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
