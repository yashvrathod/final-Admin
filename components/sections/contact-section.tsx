"use client";

import React, { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";

// Contact detail component
function ContactDetail({ icon, label, value, secondValue, isEmail }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div className="text-sm sm:text-base">
        <p className="font-medium text-yellow-900">{label}</p>
        {isEmail ? (
          <a href={`mailto:${value}`} className="text-amber-700">
            {value}
          </a>
        ) : (
          <p className="text-amber-700">
            {value}
            {secondValue && <br />}
            {secondValue && (
              <span className="text-amber-600">{secondValue}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export function ContactSection() {
  const [mounted, setMounted] = useState(false); // <- hydration fix
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true); // mark component as mounted (client-side)
  }, []);

  if (!mounted) return null; // avoid server/client mismatch

  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      await api.post("/api/contact", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  return (
    <section className="py-12 md:py-20 bg-amber-50" id="contact">
      <AnimatePresence>
        <motion.div
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 shadow-2xl rounded-2xl bg-white"
        >
          {/* Heading */}
          <motion.div
            variants={fadeVariant}
            className="text-center pt-8 mb-8 px-2"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-900 mb-2">
              Academic Collaborations & Inquiries
            </h2>
            <p className="text-amber-700 max-w-2xl mx-auto text-sm sm:text-base">
              Open to research partnerships, student mentorship,
              industry–academia initiatives, branding strategies, and innovative
              software solutions that bridge academia, industry, and technology
              for impactful, future-ready outcomes.
            </p>
          </motion.div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 p-4 sm:p-6 md:p-8">
            {/* Left Contact Info */}
            <motion.div
              variants={fadeVariant}
              className="bg-amber-100 text-yellow-900 rounded-xl p-6 sm:p-8 shadow-md w-full"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-yellow-900 border-b border-amber-300 pb-2">
                Contact Information
              </h3>

              <div className="space-y-5 sm:space-y-6">
                <ContactDetail
                  icon={<FiUser size={18} className="text-amber-700" />}
                  label="Name"
                  value="Dr. Anup Ingle"
                />
                <ContactDetail
                  icon={<FiPhone size={18} className="text-amber-700" />}
                  label="Phone"
                  value="+91-9325383604 (Primary)"
                />
                <ContactDetail
                  icon={<FiMail size={18} className="text-amber-700" />}
                  label="Email"
                  value="anup.ingle@vit.edu"
                  isEmail
                />
                <ContactDetail
                  icon={<FiMapPin size={18} className="text-amber-700" />}
                  label="Office"
                  value="Department of Electronics & Telecommunication"
                  secondValue="VIT, Pune, Maharashtra"
                />
                <ContactDetail
                  icon={<FiClock size={18} className="text-amber-700" />}
                  label="Availability"
                  value="Mon-Fri: 10:00 AM - 5:00 PM"
                  secondValue="Preferably"
                />
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.form
              variants={fadeVariant}
              onSubmit={handleSubmit}
              className="space-y-5 w-full"
            >
              {status === "success" && (
                <div className="p-4 rounded bg-green-100 text-green-700">
                  Your message has been sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="p-4 rounded bg-red-100 text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-yellow-900">
                    Full Name *
                  </label>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e: any) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-yellow-900">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e: any) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-900 mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="w-full rounded-md border border-amber-300 px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-amber-300 bg-white"
                >
                  <option value="">Select inquiry type</option>
                  <option value="research">Research Collaboration</option>
                  <option value="guidance">Student Guidance</option>
                  <option value="lecture">Invited Lecture Request</option>
                  <option value="other">Other Academic Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-yellow-900">
                  Message *
                </label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e: any) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-amber-300 text-amber-700 focus:ring-amber-400 mt-1"
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-xs sm:text-sm text-yellow-900"
                >
                  I consent to the processing of my personal data for academic
                  communication purposes
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white font-medium py-3 rounded-md hover:opacity-90 transition shadow-md hover:shadow-lg"
              >
                {status === "loading" ? "Sending..." : "Send Academic Inquiry"}
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
