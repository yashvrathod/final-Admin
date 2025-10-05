"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import {
  FiAward,
  FiCalendar,
  FiBook,
  FiPenTool,
  FiZap,
  FiMapPin,
  FiCopy,
  FiList,
  FiActivity,
  FiDatabase,
  FiLayers,
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiWifi,
  FiTool,
  FiUsers,
  FiGlobe,
  FiClock,
  FiMic,
  FiExternalLink,
  FiTarget,
  FiUser,
  FiPhone,
  FiMail,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";
import SectionWrapper from "../SectionWrapper";
import InfoBlock from "../InfoBlock";

interface PortfolioSectionProps {
  interests: Array<{ title: string; description: string | null }>;
  skills: Array<{ name: string; category: string | null }>;
  skillSections: Array<{
    id: string;
    title: string;
    icon: any;
    color: string;
    items: string[];
  }>;
  teaching: Array<{
    course: string;
    institution: string;
    duration: string | null;
  }>;
  teachingInterest: Array<{
    id: string;
    course: string;
    isActive: boolean;
  }>;
  courseTaught: Array<{
    id: string;
    course: string;
    isActive: boolean;
  }>;
  guidance: Array<{
    id: string;
    guidance: string;
    isActive: boolean;
  }>;
  certifications: Array<{
    name: string;
    provider: string;
    year: string | null;
    credentialUrl: string | null;
    linkText: string | null;
  }>;

  talks: Array<{
    title: string;
    college: string | null;
    topic: string;
    event: string;
    link: string | null;
    location: string | null;
    videoUrl: string | null;
    description: string | null;
    date: string | null;
  }>;
  projects: Array<{
    image: string | null;
    title: string;
    shortDescription: string | null;
    type?: string | null;
    typeCompany?: string | null;
    typeUrl?: string | null;
    testimonial?: string | null;
    ytLink?: string | null;
    linkedinPost?: string | null;
    technologies?: string | null;
    projectUrl?: string | null;
    githubUrl?: string | null;
  }>;
  projectSkills: Array<{
    id: string;
    skill: string;
    isActive: boolean;
  }>;
  journals: Array<{
    id: string; // add id for key mapping
    title: string;
    authors: string;
    journal: string;
    details?: string | null; // optional, matches schema
    year?: string | null;
    volume?: string | null;
    issue?: string | null;
    pages?: string | null;
    doi?: string | null;
    url?: string | null;
    type?: "international" | "national" | null;
    isActive: boolean;
  }>;
  conferences: Array<{
    title: string;
    authors: string;
    conference: string;
    year: string | null;
    url: string | null;
    details: string | null;
    type: "international" | "national";
    id: string;
    isActive: boolean;
    doi: string | null;
    location: string | null;
    abstract: string | null;
    link: string | null;
    createdAt: Date;
    updatedAt: Date;
    order: number;
    event: string;
  }>;
  books: Array<{
    id: string;
    course: string | null;
    link: string | null;
    title: string;
    authors: string;
    publisher: string | null;
    year: string | null;
    isActive: boolean;
  }>;

  bookChapters: Array<{
    id: string;
    chapterTitle: string;
    bookTitle: string;
    year: string;
    doi: string | null;
    doiLink: string | null;
    isbn: string | null;
    coAuthors: string;
    scopusLink: string | null;
    crossrefLink: string | null;
    isActive: boolean;
  }>;

  patents: Array<{
    id: string;
    title: string;
    inventors: string;
    patentNumber: string | null;
    status: string | null;
    applicationNumber: string | null;
    filingDate: string | null;
    grantDate: string | null;
    publishedDate: string | null;
    url: string | null;
    description: string | null;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export function PortfolioSection({
  interests,
  skills,
  skillSections,
  teaching,
  teachingInterest,
  courseTaught,
  guidance,
  certifications,
  talks,
  projects,
  projectSkills,
  journals,
  conferences,
  books,
  bookChapters,
  patents,
}: PortfolioSectionProps) {
  // Helper to extract year from a string (e.g., from `details`)
  function extractYear(details?: string | null): string | undefined {
    if (!details) return undefined;
    const match = details.match(/\b(19|20)\d{2}\b/); // matches years 1900-2099
    return match ? match[0] : undefined;
  }

  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
          Academic Portfolio
        </h2>

        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <TabsTrigger
              value="overview"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="professional-competencies"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Professional Competencies
            </TabsTrigger>
            <TabsTrigger
              value="teaching"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Teaching
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Certifications
            </TabsTrigger>
            <TabsTrigger
              value="talks"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Talks
            </TabsTrigger>
            <TabsTrigger
              value="conference"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Conference
            </TabsTrigger>
            <TabsTrigger
              value="books"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Books
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="journals"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Journals
            </TabsTrigger>
            <TabsTrigger
              value="patents"
              className="px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100 data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Intellectual Property
            </TabsTrigger>
          </TabsList>

          {/* Overiew -interest */}
          <TabsContent
            value="overview"
            className="space-y-12 border-t-4 border-t-amber-700 border-l border-l-transparent rounded-tl-lg pl-6 pt-6"
          >
            {/* Interests Section */}
            {interests.length > 0 && (
              <section id="interests" className="space-y-12">
                <h2 className="text-2xl font-semibold border-l-4 border-l-amber-400 pl-3 text-amber-900">
                  Interests
                </h2>

                {/* Other Titles */}
                {interests.filter(
                  (i) =>
                    i.title !== "Areas Of Interest" &&
                    i.title !== "Research Interests" &&
                    i.title !== "Long-Term Vision"
                ).length > 0 && (
                  <div className="">
                    {interests
                      .filter(
                        (i) =>
                          i.title !== "Areas Of Interest" &&
                          i.title !== "Research Interests" &&
                          i.title !== "Long-Term Vision"
                      )
                      .map((interest, idx) => (
                        <Card
                          key={idx}
                          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 p-6"
                        >
                          <CardHeader className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full text-amber-800 shadow">
                                <FiStar size={20} />
                              </div>
                              <h3 className="font-semibold text-lg text-amber-900">
                                {interest.title}
                              </h3>
                            </div>

                            {interest.description && (
                              <>
                                {interest.description.includes(",") ? (
                                  <ul className="space-y-2 text-stone-700 mt-2">
                                    {interest.description
                                      .split(",")
                                      .map((item, index) => (
                                        <li
                                          key={index}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="text-amber-700 mt-1">
                                            •
                                          </span>
                                          <span>{item.trim()}</span>
                                        </li>
                                      ))}
                                  </ul>
                                ) : (
                                  <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                                    {interest.description}
                                  </CardDescription>
                                )}
                              </>
                            )}
                          </CardHeader>
                        </Card>
                      ))}
                  </div>
                )}

                {/* Areas of Interest */}
                {interests.some((i) => i.title === "Areas Of Interest") && (
                  <div className="">
                    {interests
                      .filter((i) => i.title === "Areas Of Interest")
                      .map((interest, idx) => (
                        <Card
                          key={idx}
                          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 p-6"
                        >
                          <CardHeader className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full text-amber-800 shadow">
                                <FiBookOpen size={20} />
                              </div>
                              <h3 className="font-semibold text-lg text-amber-900">
                                {interest.title}
                              </h3>
                            </div>

                            {interest.description && (
                              <>
                                {interest.description.includes(",") ? (
                                  <ul className="space-y-2 text-stone-700 mt-2">
                                    {interest.description
                                      .split(",")
                                      .map((item, index) => (
                                        <li
                                          key={index}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="text-amber-700 mt-1">
                                            •
                                          </span>
                                          <span>{item.trim()}</span>
                                        </li>
                                      ))}
                                  </ul>
                                ) : (
                                  <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                                    {interest.description}
                                  </CardDescription>
                                )}
                              </>
                            )}
                          </CardHeader>
                        </Card>
                      ))}
                  </div>
                )}

                {/* Research Interests */}
                {interests.some((i) => i.title === "Research Interests") && (
                  <div className="">
                    {interests
                      .filter((i) => i.title === "Research Interests")
                      .map((interest, idx) => (
                        <Card
                          key={idx}
                          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 p-6"
                        >
                          <CardHeader className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full text-amber-800 shadow">
                                <FiCpu size={20} />
                              </div>
                              <CardTitle className="font-semibold text-lg text-amber-900">
                                {interest.title}
                              </CardTitle>
                            </div>

                            {interest.description && (
                              <>
                                {interest.description.includes(",") ? (
                                  <ul className="space-y-2 text-stone-700 mt-2">
                                    {interest.description
                                      .split(",")
                                      .map((item, index) => (
                                        <li
                                          key={index}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="text-amber-700 mt-1">
                                            •
                                          </span>
                                          <span>{item.trim()}</span>
                                        </li>
                                      ))}
                                  </ul>
                                ) : (
                                  <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                                    {interest.description}
                                  </CardDescription>
                                )}
                              </>
                            )}
                          </CardHeader>
                        </Card>
                      ))}
                  </div>
                )}

                {/* Long-Term Vision */}
                {interests.some((i) => i.title === "Long-Term Vision") && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold border-l-4 pl-3 border-amber-400 text-amber-900">
                      Ultimate Research Goal
                    </h3>
                    <div className="">
                      {interests
                        .filter((i) => i.title === "Long-Term Vision")
                        .map((interest, idx) => (
                          <Card
                            key={idx}
                            className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                          >
                            <CardHeader className="space-y-4">
                              <div className="w-10 h-10 flex items-center justify-center bg-amber-600 text-white rounded-full shadow">
                                <FiTarget size={20} />
                              </div>
                              <CardTitle className="font-semibold text-lg text-amber-900">
                                {interest.title}
                              </CardTitle>
                              {interest.description && (
                                <CardDescription className="text-stone-800 text-base leading-relaxed">
                                  {interest.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </TabsContent>

          {/* Professional Competencies */}
          <TabsContent value="professional-competencies" className="space-y-8">
            <SectionWrapper
              title={
                <span className="text-amber-900 text-2xl font-bold">
                  Professional Competencies
                </span>
              }
            >
              <div className="grid md:grid-cols-2 gap-8">
                {skillSections && skillSections.length > 0 ? (
                  skillSections.map((section) => {
                    // Dynamically resolve icon from string (optional)
                    const IconComponent =
                      section.icon && require("react-icons/fi")[section.icon]
                        ? require("react-icons/fi")[section.icon]
                        : null;

                    return (
                      <div
                        key={section.id}
                        className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition ${section.color}`}
                      >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full shadow">
                            {IconComponent ? (
                              <IconComponent size={20} />
                            ) : (
                              <span className="text-sm font-bold">★</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg text-amber-900">
                            {section.title}
                          </h3>
                        </div>

                        {/* Skills as tags */}
                        {section.items && section.items.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {section.items.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-white border border-amber-200 rounded-full text-stone-700 hover:bg-amber-100 transition"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500">
                    No professional competencies added yet.
                  </p>
                )}
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Teaching & Project Guidance */}
          <TabsContent value="teaching" className="space-y-12">
            {/* Courses Taught */}
            <SectionWrapper title="Courses Taught">
              <div className="border border-[#FFC107] rounded-xl bg-[#FFFDF7] shadow-sm p-6">
                <h3 className="text-[#5C2E00] text-lg font-bold mb-4 flex items-center gap-2">
                  <FiBookOpen /> Subjects & Topics
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courseTaught.map((item) => (
                    <li
                      key={item.id}
                      className="px-3 py-2 bg-[#FFF8E1] border border-[#FFC107] rounded-md text-[#4E342E]"
                    >
                      {item.course}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>

            {/* Project Guidance */}
            <SectionWrapper title="Project Advisory Role">
              <div className="border border-[#FFC107] rounded-xl bg-[#FFFDF7] shadow-sm p-6">
                <h3 className="text-[#5C2E00] text-lg font-bold mb-4 flex items-center gap-2">
                  <FiUsers /> Mentorship & Supervision
                </h3>
                <ul className="space-y-3">
                  {guidance.map((item) => (
                    <li
                      key={item.id}
                      className="px-3 py-2 border-l-4 border-[#FFC107] bg-[#FFF8E1] rounded text-[#4E342E]"
                    >
                      {item.guidance}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* conference */}
          <TabsContent value="conference" className="space-y-8">
            {/* Separate National vs International */}
            {(() => {
              const nationalConfs = conferences.filter(
                (c) => c.type === "national"
              );
              const internationalConfs = conferences.filter(
                (c) => c.type === "international"
              );

              const renderSection = (
                title: string,
                confs: typeof conferences
              ) => (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-900 border-b border-amber-300 pb-2">
                    {title}
                  </h3>

                  {confs.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No conferences found.
                    </p>
                  )}

                  {confs.map((conf) => {
                    const year = extractYear(conf.details); // assuming extractYear is defined

                    return (
                      <details
                        key={conf.title}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden"
                      >
                        <summary className="flex justify-between items-center px-5 py-3 bg-amber-50 hover:bg-amber-100 cursor-pointer">
                          <div className="text-left">
                            <h4 className="font-semibold text-amber-900">
                              {conf.title.length > 70
                                ? conf.title.slice(0, 70) + "..."
                                : conf.title}
                            </h4>
                            {year && (
                              <span className="text-xs text-amber-700 flex items-center gap-1">
                                <FiCalendar
                                  className="text-yellow-900"
                                  size={14}
                                />
                                {year}
                              </span>
                            )}
                          </div>
                          <span className="ml-2 text-yellow-900">
                            <FiChevronDown size={18} />
                          </span>
                        </summary>

                        <div className="px-5 py-3 border-t border-amber-200 bg-yellow-50">
                          <p className="text-sm text-gray-700 mb-1">
                            {conf.authors}
                          </p>
                          <p className="text-sm italic text-gray-600 mb-1">
                            {conf.event}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conf.details}
                          </p>

                          {conf.link && conf.link !== "#" && (
                            <a
                              href={conf.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-sm"
                            >
                              <FiExternalLink
                                className="mr-1 text-yellow-900"
                                size={14}
                              />
                              {conf.link.includes("ieeexplore")
                                ? "IEEE Xplore"
                                : "Conference Website"}
                            </a>
                          )}
                        </div>
                      </details>
                    );
                  })}
                </div>
              );

              return (
                <>
                  {renderSection("National Conferences", nationalConfs)}
                  {renderSection(
                    "International Conferences",
                    internationalConfs
                  )}
                </>
              );
            })()}
          </TabsContent>

          <TabsContent value="books" className="space-y-12">
            {/* Authored Books */}
            <SectionWrapper title="Authored Books">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className={`flex flex-col justify-between rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition bg-white border ${
                      index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
                    }`}
                  >
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-amber-900 font-semibold text-lg mb-1">
                        {book.title}
                      </h3>
                      {book.course && (
                        <p className="text-sm text-yellow-900 mb-1">
                          {book.course}
                        </p>
                      )}
                      {book.publisher && (
                        <p className="text-xs text-amber-700 mb-3">
                          Published by:{" "}
                          <span className="font-medium">{book.publisher}</span>
                        </p>
                      )}
                      {book.link && (
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-block text-center bg-amber-800 text-white py-1.5 rounded-lg hover:bg-amber-900 transition font-medium"
                        >
                          Link <FiExternalLink className="inline ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            {/* Book Chapters */}
            <SectionWrapper title="Book Chapters">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bookChapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className={`flex flex-col justify-between rounded-xl shadow-md p-5 border transition-transform duration-200 hover:scale-105 ${
                      index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
                    } bg-white dark:bg-slate-800`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-amber-900">
                        {chapter.chapterTitle}
                      </h3>
                      <p className="italic text-slate-700">
                        {chapter.bookTitle}
                      </p>
                      <p className="text-sm text-slate-500 font-medium">
                        Year: {chapter.year}
                      </p>
                      {chapter.doi && (
                        <p className="text-sm text-slate-500">
                          DOI:{" "}
                          <span className="font-medium">{chapter.doi}</span>{" "}
                          {chapter.doiLink && (
                            <a
                              href={chapter.doiLink}
                              className="text-blue-500 underline ml-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          )}
                        </p>
                      )}
                      {chapter.isbn && (
                        <p className="text-sm text-slate-500">
                          ISBN:{" "}
                          <span className="font-medium">{chapter.isbn}</span>
                        </p>
                      )}
                      <p className="text-sm text-slate-500">
                        Co-Authors:{" "}
                        <span className="font-medium">{chapter.coAuthors}</span>
                      </p>
                      {chapter.scopusLink && (
                        <p className="text-sm text-slate-500">
                          Scopus:{" "}
                          <a
                            href={chapter.scopusLink}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </p>
                      )}
                      {chapter.crossrefLink && (
                        <p className="text-sm text-slate-500">
                          Crossref:{" "}
                          <a
                            href={chapter.crossrefLink}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Journals */}
          <TabsContent value="journals" className="space-y-4">
            {/* International Journals */}
            {journals.filter((j) => j.type === "international").length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  International Journals
                </h3>
                <div className="space-y-3">
                  {journals
                    .filter((j) => j.type === "international")
                    .map((journal) => (
                      <details
                        key={journal.title}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden group"
                      >
                        <summary className="px-5 py-3 bg-amber-50 cursor-pointer flex justify-between items-center">
                          <span className="font-semibold text-amber-900">
                            {journal.title}
                          </span>
                          {journal.year && (
                            <span className="text-xs text-amber-700 ml-2">
                              ({journal.year})
                            </span>
                          )}
                          <svg
                            className="ml-2 h-4 w-4 text-amber-900 transition-transform duration-200 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="px-5 py-3 border-t border-amber-200 bg-yellow-50 space-y-1">
                          <p className="text-sm text-gray-700">
                            {journal.authors}
                          </p>
                          <p className="text-sm italic text-gray-600">
                            {journal.journal}
                          </p>
                          {journal.url && (
                            <a
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-sm"
                            >
                              View Publication
                            </a>
                          )}
                        </div>
                      </details>
                    ))}
                </div>
              </div>
            )}

            {/* National Journals */}
            {journals.filter((j) => j.type === "national").length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  National Journals
                </h3>
                <div className="space-y-3">
                  {journals
                    .filter((j) => j.type === "national")
                    .map((journal) => (
                      <details
                        key={journal.title}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden group"
                      >
                        <summary className="px-5 py-3 bg-amber-50 cursor-pointer flex justify-between items-center">
                          <span className="font-semibold text-amber-900">
                            {journal.title}
                          </span>
                          {journal.year && (
                            <span className="text-xs text-amber-700 ml-2">
                              ({journal.year})
                            </span>
                          )}
                          <svg
                            className="ml-2 h-4 w-4 text-amber-900 transition-transform duration-200 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="px-5 py-3 border-t border-amber-200 bg-yellow-50 space-y-1">
                          <p className="text-sm text-gray-700">
                            {journal.authors}
                          </p>
                          <p className="text-sm italic text-gray-600">
                            {journal.journal}
                          </p>
                          {journal.url && (
                            <a
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-sm"
                            >
                              View Publication
                            </a>
                          )}
                        </div>
                      </details>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Project Skills */}
          <TabsContent value="projects" className="space-y-12">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              {projectSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-5 py-2 sm:px-7 sm:py-3 rounded-full shadow-md text-sm sm:text-base font-medium
                   bg-yellow-100 text-amber-900 hover:bg-yellow-200 hover:shadow-lg transition-all duration-300 relative"
                >
                  {skill.skill}
                </motion.div>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF8E1] border border-[#FFC107] rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* Image */}
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#5C2E00]">
                      {proj.title}
                    </h3>

                    {proj.shortDescription && (
                      <p className="text-[#4E342E] text-sm leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    )}

                    {proj.type && (
                      <p className="text-sm font-medium text-[#8D6E63]">
                        {proj.type}
                        {proj.typeCompany && proj.typeUrl && (
                          <a
                            href={proj.typeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D35400] ml-2 hover:underline inline-flex items-center"
                          >
                            {proj.typeCompany}{" "}
                            <FiExternalLink size={14} className="ml-1" />
                          </a>
                        )}
                      </p>
                    )}

                    {proj.testimonial && (
                      <blockquote className="text-sm italic text-[#6D4C41] border-l-4 border-[#FFC107] pl-3">
                        {proj.testimonial}
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-4 pt-2">
                      {proj.ytLink && (
                        <a
                          href={proj.ytLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 font-semibold hover:underline"
                        >
                          YouTube
                        </a>
                      )}
                      {proj.linkedinPost && (
                        <a
                          href={proj.linkedinPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 font-semibold hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 font-semibold hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>

                    {proj.technologies && (
                      <div className="flex flex-wrap gap-2 pt-3">
                        {proj.technologies.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-yellow-100 text-amber-900 rounded-full"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <p className="text-center text-gray-500">No projects found.</p>
            )}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <SectionWrapper title="Professional Certifications">
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-6 shadow-sm hover:shadow-md transition group min-h-[200px] flex flex-col justify-between"
                  >
                    {/* Year Badge */}
                    {cert.year && (
                      <span className="absolute top-3 right-3 bg-[#FFE082] text-[#5C2E00] text-xs font-semibold px-3 py-0.5 rounded-full shadow-sm">
                        {cert.year}
                      </span>
                    )}

                    <div>
                      {/* Icon + Title */}
                      <div className="flex items-center mb-3">
                        <FiAward
                          className="text-[#5C2E00] mr-2 flex-shrink-0"
                          size={24}
                        />
                        <h3 className="font-semibold text-[#3E2723] text-lg">
                          {cert.name}
                        </h3>
                      </div>

                      {/* Details */}
                      {cert.provider && (
                        <p className="text-sm text-[#4E342E] mb-1">
                          {cert.provider}
                        </p>
                      )}
                    </div>

                    {/* Link */}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#5C2E00] hover:underline text-sm mt-3"
                      >
                        {cert.credentialUrl ? "View Certificate" : ""}{" "}
                        <FiExternalLink className="ml-1" size={14} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>
          </TabsContent>

          <TabsContent value="talks" className="space-y-8">
            <InfoBlock color="amber">
              <SectionWrapper title="Guest Lectures">
                <div className="flex items-center gap-2 mb-4 text-amber-900">
                  <FiMic size={22} />
                  <span className="font-semibold">
                    Invited Talks & Sessions
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {talks.map((talk, index) => (
                    <div
                      key={index}
                      className="bg-yellow-100 border border-amber-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-stone-800">
                        {talk.college}
                      </h3>
                      <p className="text-sm text-stone-700 mt-1">
                        <span className="font-medium text-amber-900">
                          Topic:
                        </span>{" "}
                        {talk.topic}
                      </p>
                      {talk.date && (
                        <p className="text-sm text-stone-700 mt-1">
                          <span className="font-medium text-amber-900">
                            Date:
                          </span>{" "}
                          {talk.date}
                        </p>
                      )}
                      {talk.location && (
                        <p className="text-sm text-stone-700 mt-1">
                          <span className="font-medium text-amber-900">
                            Location:
                          </span>{" "}
                          {talk.location}
                        </p>
                      )}
                      {talk.link && (
                        <a
                          href={talk.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 hover:underline inline-flex items-center mt-2 text-sm"
                        >
                          College Website{" "}
                          <FiExternalLink className="ml-1" size={14} />
                        </a>
                      )}
                      {talk.videoUrl && (
                        <a
                          href={talk.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 hover:underline inline-flex items-center mt-1 text-sm"
                        >
                          Video <FiExternalLink className="ml-1" size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            </InfoBlock>
          </TabsContent>

          {/* patents */}
          <TabsContent value="patents" className="space-y-8">
            {/* Granted Patents */}
            <InfoBlock color="amber">
              <SectionWrapper title="Granted Patents">
                {patents.filter((p) => p.status === "granted").length === 0 ? (
                  <div className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md">
                    <h3 className="font-semibold text-lg text-yellow-900">
                      Under construction
                    </h3>
                  </div>
                ) : (
                  patents
                    .filter((p) => p.status === "granted")
                    .map((patent, idx) => (
                      <div
                        key={idx}
                        className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md space-y-2"
                      >
                        <h3 className="font-semibold text-lg text-yellow-900">
                          {patent.title}
                        </h3>
                        <p className="text-sm text-yellow-800">
                          {patent.publishedDate
                            ? `Published on ${patent.publishedDate}`
                            : ""}{" "}
                          {patent.applicationNumber
                            ? `, Application Number: ${patent.applicationNumber}`
                            : ""}
                        </p>
                        {patent.url && (
                          <a
                            href={patent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:text-amber-900 hover:underline inline-flex items-center text-sm font-medium"
                          >
                            Patent Link{" "}
                            <FiExternalLink className="ml-1" size={14} />
                          </a>
                        )}
                      </div>
                    ))
                )}
              </SectionWrapper>
            </InfoBlock>

            {/* Published Patents */}
            <InfoBlock color="amber">
              <SectionWrapper title="Published Patents">
                {patents.filter((p) => p.status === "published").length ===
                0 ? (
                  <div className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md">
                    <h3 className="font-semibold text-lg text-yellow-900">
                      Under construction
                    </h3>
                  </div>
                ) : (
                  patents
                    .filter((p) => p.status === "published")
                    .map((patent, idx) => (
                      <div
                        key={idx}
                        className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md space-y-2"
                      >
                        <h3 className="font-semibold text-lg text-yellow-900">
                          {patent.title}
                        </h3>
                        <p className="text-sm text-yellow-800">
                          {patent.publishedDate
                            ? `Published on ${patent.publishedDate}`
                            : ""}{" "}
                          {patent.applicationNumber
                            ? `, Application Number: ${patent.applicationNumber}`
                            : ""}
                        </p>
                        {patent.url && (
                          <a
                            href={patent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:text-amber-900 hover:underline inline-flex items-center text-sm font-medium"
                          >
                            Patent Link{" "}
                            <FiExternalLink className="ml-1" size={14} />
                          </a>
                        )}
                      </div>
                    ))
                )}
              </SectionWrapper>
            </InfoBlock>

            {/* Filed Patents */}
            <InfoBlock color="amber">
              <SectionWrapper title="Filed Patents">
                {patents.filter((p) => p.status === "filed").length === 0 ? (
                  <div className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md">
                    <h3 className="font-semibold text-lg text-yellow-900">
                      Under construction
                    </h3>
                  </div>
                ) : (
                  patents
                    .filter((p) => p.status === "filed")
                    .map((patent, idx) => (
                      <div
                        key={idx}
                        className="mt-4 border-l-4 border-amber-400 pl-4 bg-amber-50 rounded-xl p-6 shadow-md space-y-2"
                      >
                        <h3 className="font-semibold text-lg text-yellow-900">
                          {patent.title}
                        </h3>
                        <p className="text-sm text-yellow-800">
                          {patent.publishedDate
                            ? `Published on ${patent.publishedDate}`
                            : ""}{" "}
                          {patent.applicationNumber
                            ? `, Application Number: ${patent.applicationNumber}`
                            : ""}
                        </p>
                        {patent.url && (
                          <a
                            href={patent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:text-amber-900 hover:underline inline-flex items-center text-sm font-medium"
                          >
                            Patent Link{" "}
                            <FiExternalLink className="ml-1" size={14} />
                          </a>
                        )}
                      </div>
                    ))
                )}
              </SectionWrapper>
            </InfoBlock>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
