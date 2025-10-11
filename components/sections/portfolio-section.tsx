"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  ExternalLink,
  FileText,
  GraduationCap,
  Hammer,
  Lightbulb,
  List,
  Mic2,
  Sparkles,
} from "lucide-react";
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
import { useState } from "react";

interface PortfolioSectionProps {
  areaOfInterest: Array<{
    id: string;
    title: string;
    description: string | null;
    isActive: boolean;
  }>;
  researchInterest: Array<{
    id: string;
    title: string;

    description: string | null;
    isActive: boolean;
  }>;
  ultimateGoal: Array<{
    id: string;
    title: string;
    description: string | null;
    isActive: boolean;
  }>;
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
    id: string;
    title: string;
    authors: string;
    journal: string;
    details?: string | null;
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
  areaOfInterest,
  researchInterest,
  ultimateGoal,
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
  const [isActive, setIsActive] = useState(false);

  function extractYear(details?: string | null): string | undefined {
    if (!details) return undefined;
    const match = details.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : undefined;
  }

  const tabs = [
    {
      value: "overview",
      label: "Overview",
      icon: <List className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "interests",
      label: "Interests",
      icon: <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "professional-competencies",
      label: "Professional Competencies",
      icon: <Briefcase className="w-12 h-3 sm:w-12 sm:h-4" />,
    },
    {
      value: "teaching",
      label: "Teaching",
      icon: <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "certifications",
      label: "Certifications",
      icon: <Award className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "talks",
      label: "Invited Talks",
      icon: <Mic2 className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "projects",
      label: "Projects",
      icon: <Hammer className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "journals",
      label: "Journals",
      icon: <BookMarked className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "conference",
      label: "Conferences",
      icon: <FileText className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "books",
      label: "Books",
      icon: <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      value: "patents",
      label: "Intellectual Property",
      icon: <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
  ];

  const iconStyle = "text-amber-700";
  const info = [
    {
      icon: <FiBriefcase className={iconStyle} size={28} />,
      title: "Current Position",
      text: "Assistant Professor, Department of Electronics & Telecommunication Engineering",
    },
    {
      icon: <FiBookOpen className={iconStyle} size={28} />,
      title: "Education",
      text: "Ph.D. in Electronics & Communication Engineering",
    },
    {
      icon: <FiClock className={iconStyle} size={28} />,
      title: "Experience",
      text: "20+ years teaching experience\n1+ year industry experience",
    },
    {
      icon: <FiTarget className={iconStyle} size={28} />,
      title: "Research Focus",
      text: "FLOW-BASED PATTERN MATCHING APPROACH TO MITIGATE THE DENIAL OF SERVICE ATTACK ON COMMUNICATION NETWORK ",
    },
  ];
  const InterestCard = ({ icon: Icon, title, items }) => (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full text-amber-800 shadow">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-lg text-amber-900">{title}</h3>
      </div>
      <ul className="space-y-2 text-stone-700">
        {items.map((item, index) => (
          <li key={item.id || index} className="flex items-start gap-2">
            <span className="text-amber-700 mt-1">•</span>
            <span>{item.interest}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const CombinedInterestCard = ({ areaOfInterests, researchInterests }) => (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition space-y-8">
      {/* Areas of Interest */}
      {areaOfInterests.length > 0 && (
        <InterestCard
          icon={FiBookOpen}
          title="Areas of Interest"
          items={areaOfInterests}
        />
      )}

      {/* Research Interests */}
      {researchInterests.length > 0 && (
        <InterestCard
          icon={FiCpu}
          title="Research Interests"
          items={researchInterests}
        />
      )}

      {/* Ultimate Goal */}
      <SectionWrapper
        title={
          <span className="text-amber-900 text-2xl font-bold">
            Ultimate Research Goal
          </span>
        }
      >
        <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-amber-600 text-white rounded-full shadow">
              <FiTarget size={20} />
            </div>
            <h3 className="font-semibold text-lg text-amber-900">
              {ultimateGoal[0]?.title || "Long-Term Vision"}
            </h3>
          </div>
          <p className="text-stone-800 text-base leading-relaxed">
            {ultimateGoal[0]?.description ? (
              <>
                <span className="font-semibold text-amber-800">
                  {ultimateGoal[0].description}
                </span>
              </>
            ) : (
              "To achieve my long-term research objectives."
            )}
          </p>
        </div>
      </SectionWrapper>
    </div>
  );

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-amber-800 mb-10 tracking-wide"
        >
          Dr. Anup Ingle – Academic Portfolio
        </motion.h1>

        <Tabs defaultValue="overview" className=" max-w-5xl mx-auto">
          <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-24 w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-10 px-4 py-2 text-sm md:text-base font-medium rounded-lg transition-all duration-300 flex items-center
                 bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-100
                 data-[state=active]:bg-amber-700
                 data-[state=active]:text-white
                 data-[state=active]:shadow-lg
                 active:shadow-inner active:translate-y-1"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="overview"
            className="bg-white rounded-2xl space-y-12 sm:space-y-10 lg:space-y-12" // only spacing, remove extra bg/padding
          >
            {/* Keep the Overview exactly as it is */}
            <div className="space-y-12 m-6 sm:m-8 lg:m-10 rounded-lg bg-white">
              {/* Professional Profile */}
              <SectionWrapper
                title={
                  <span className="text-amber-900 text-2xl font-bold">
                    Professional Profile
                  </span>
                }
              >
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {info.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start bg-white border border-amber-100 rounded-xl p-6 shadow hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-amber-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-stone-700 text-sm whitespace-pre-line">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionWrapper>

              {/* Professional Summary */}
              <SectionWrapper
                title={
                  <span className="text-amber-900 text-2xl font-bold">
                    Professional Summary
                  </span>
                }
              >
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <p className="text-base text-stone-800 leading-relaxed text-justify">
                    Dr. Anup Ingle is an accomplished academic and researcher
                    with expertise in computer networks, security, and IoT. His
                    research focuses on intrusion detection systems, DDoS attack
                    mitigation, and network anomaly detection. With extensive
                    experience in both academia and industry, he has published
                    numerous papers in reputed journals and conferences,
                    authored several textbooks, and actively contributes to
                    student development through industry collaborations and
                    internships.
                  </p>
                </div>
              </SectionWrapper>
            </div>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent
            value="interests"
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            {/* Sections */}
            <SectionWrapper
              title={
                <span className="text-amber-900 text-2xl font-bold">
                  Interests & Goals
                </span>
              }
            >
              <CombinedInterestCard
                areaOfInterests={areaOfInterest}
                researchInterests={researchInterest}
              />
            </SectionWrapper>
          </TabsContent>

          {/* Professional Competencies */}
          <TabsContent
            value="professional-competencies"
            className="space-y-6 sm:space-y-8"
          >
            <SectionWrapper
              title={
                <span className="text-amber-900 text-xl sm:text-2xl font-bold">
                  Professional Competencies
                </span>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {skillSections && skillSections.length > 0 ? (
                  skillSections.map((section) => {
                    const IconComponent =
                      section.icon && require("react-icons/fi")[section.icon]
                        ? require("react-icons/fi")[section.icon]
                        : null;

                    return (
                      <div
                        key={section.id}
                        className={`rounded-xl shadow-sm border p-4 sm:p-5 lg:p-6 hover:shadow-md transition ${section.color}`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full shadow flex-shrink-0">
                            {IconComponent ? (
                              <IconComponent
                                size={16}
                                className="sm:w-5 sm:h-5"
                              />
                            ) : (
                              <span className="text-xs sm:text-sm font-bold">
                                ★
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-base sm:text-lg text-amber-900">
                            {section.title}
                          </h3>
                        </div>

                        {section.items && section.items.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {section.items.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-white border border-amber-200 rounded-full text-stone-700 hover:bg-amber-100 transition"
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
                  <p className="text-xs sm:text-sm text-slate-500">
                    No professional competencies added yet.
                  </p>
                )}
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Teaching */}
          <TabsContent
            value="teaching"
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            <SectionWrapper title="Courses Taught">
              <div className="border border-amber-200 rounded-xl bg-amber-50/50 shadow-sm p-4 sm:p-5 lg:p-6">
                <h3 className="text-amber-900 text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <FiBookOpen className="flex-shrink-0" /> Subjects & Topics
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {courseTaught.map((item) => (
                    <li
                      key={item.id}
                      className="px-3 py-2 bg-white border border-amber-200 rounded-md text-stone-700 text-sm sm:text-base"
                    >
                      {item.course}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>

            <SectionWrapper title="Project Advisory Role">
              <div className="border border-amber-200 rounded-xl bg-amber-50/50 shadow-sm p-4 sm:p-5 lg:p-6">
                <h3 className="text-amber-900 text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <FiUsers className="flex-shrink-0" /> Mentorship & Supervision
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {guidance.map((item) => (
                    <li
                      key={item.id}
                      className="px-3 py-2 border-l-4 border-amber-400 bg-white rounded text-stone-700 text-sm sm:text-base"
                    >
                      {item.guidance}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Certifications */}
          <TabsContent
            value="certifications"
            className="space-y-4 sm:space-y-6"
          >
            <SectionWrapper title="Professional Certifications">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-amber-50/50 border border-amber-200 rounded-lg p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition group min-h-[160px] sm:min-h-[180px] flex flex-col justify-between"
                  >
                    {cert.year && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-amber-200 text-amber-900 text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                        {cert.year}
                      </span>
                    )}

                    <div>
                      <div className="flex items-center mb-2 sm:mb-3">
                        <FiAward
                          className="text-amber-800 mr-2 flex-shrink-0"
                          size={20}
                        />
                        <h3 className="font-semibold text-stone-800 text-sm sm:text-base lg:text-lg">
                          {cert.name}
                        </h3>
                      </div>

                      {cert.provider && (
                        <p className="text-xs sm:text-sm text-stone-700 mb-1">
                          {cert.provider}
                        </p>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-800 hover:underline text-xs sm:text-sm mt-2 sm:mt-3"
                      >
                        View Certificate{" "}
                        <FiExternalLink className="ml-1" size={14} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Talks */}
          <TabsContent value="talks" className="space-y-6 sm:space-y-8">
            <InfoBlock color="amber">
              <SectionWrapper title="Guest Lectures">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 text-amber-900">
                  <FiMic size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">
                    Invited Talks & Sessions
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {talks.map((talk, index) => (
                    <div
                      key={index}
                      className="bg-white border border-amber-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-stone-800 text-sm sm:text-base">
                        {talk.college}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-700 mt-1">
                        <span className="font-medium text-amber-900">
                          Topic:
                        </span>{" "}
                        {talk.topic}
                      </p>
                      {talk.date && (
                        <p className="text-xs sm:text-sm text-stone-700 mt-1">
                          <span className="font-medium text-amber-900">
                            Date:
                          </span>{" "}
                          {talk.date}
                        </p>
                      )}
                      {talk.location && (
                        <p className="text-xs sm:text-sm text-stone-700 mt-1">
                          <span className="font-medium text-amber-900">
                            Location:
                          </span>{" "}
                          {talk.location}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {talk.link && (
                          <a
                            href={talk.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:underline inline-flex items-center text-xs sm:text-sm"
                          >
                            Website{" "}
                            <FiExternalLink className="ml-1" size={12} />
                          </a>
                        )}
                        {talk.videoUrl && (
                          <a
                            href={talk.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:underline inline-flex items-center text-xs sm:text-sm"
                          >
                            Video <FiExternalLink className="ml-1" size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            </InfoBlock>
          </TabsContent>

          {/* Projects */}
          <TabsContent
            value="projects"
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12">
              {projectSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full shadow-md text-xs sm:text-sm lg:text-base font-medium
                   bg-yellow-100 text-amber-900 hover:bg-yellow-200 hover:shadow-lg transition-all duration-300"
                >
                  {skill.skill}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/50 border border-amber-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  )}

                  <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-900">
                      {proj.title}
                    </h3>

                    {proj.shortDescription && (
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    )}

                    {proj.type && (
                      <p className="text-xs sm:text-sm font-medium text-stone-600">
                        {proj.type}
                        {proj.typeCompany && proj.typeUrl && (
                          <a
                            href={proj.typeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 ml-2 hover:underline inline-flex items-center"
                          >
                            {proj.typeCompany}{" "}
                            <FiExternalLink size={12} className="ml-1" />
                          </a>
                        )}
                      </p>
                    )}

                    {proj.testimonial && (
                      <blockquote className="text-xs sm:text-sm italic text-stone-600 border-l-4 border-amber-400 pl-2 sm:pl-3">
                        {proj.testimonial}
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                      {proj.ytLink && (
                        <a
                          href={proj.ytLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 font-semibold hover:underline text-xs sm:text-sm"
                        >
                          YouTube
                        </a>
                      )}
                      {proj.linkedinPost && (
                        <a
                          href={proj.linkedinPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-semibold hover:underline text-xs sm:text-sm"
                        >
                          LinkedIn
                        </a>
                      )}
                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 font-semibold hover:underline text-xs sm:text-sm"
                        >
                          Live Demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 font-semibold hover:underline text-xs sm:text-sm"
                        >
                          GitHub
                        </a>
                      )}
                    </div>

                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                        {proj.technologies.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium bg-yellow-100 text-amber-900 rounded-full"
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
              <p className="text-center text-gray-500 text-sm sm:text-base">
                No projects found.
              </p>
            )}
          </TabsContent>

          {/* Journals */}
          <TabsContent value="journals" className="space-y-6 sm:space-y-8">
            {journals.filter((j) => j.type === "international").length > 0 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  International Journals
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {journals
                    .filter((j) => j.type === "international")
                    .map((journal) => (
                      <details
                        key={journal.id}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden group"
                      >
                        <summary className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 bg-amber-50 cursor-pointer flex justify-between items-center hover:bg-amber-100 transition">
                          <span className="font-semibold text-amber-900 text-sm sm:text-base flex-1 pr-2">
                            {journal.title}
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {journal.year && (
                              <span className="text-xs text-amber-700">
                                ({journal.year})
                              </span>
                            )}
                            <FiChevronDown
                              className="text-amber-900 transition-transform duration-200 group-open:rotate-180"
                              size={16}
                            />
                          </div>
                        </summary>
                        <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 border-t border-amber-200 bg-yellow-50 space-y-1">
                          <p className="text-xs sm:text-sm text-gray-700">
                            {journal.authors}
                          </p>
                          <p className="text-xs sm:text-sm italic text-gray-600">
                            {journal.journal}
                          </p>
                          {journal.url && (
                            <a
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-xs sm:text-sm mt-1"
                            >
                              View Publication{" "}
                              <FiExternalLink className="ml-1" size={12} />
                            </a>
                          )}
                        </div>
                      </details>
                    ))}
                </div>
              </div>
            )}

            {journals.filter((j) => j.type === "national").length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  National Journals
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {journals
                    .filter((j) => j.type === "national")
                    .map((journal) => (
                      <details
                        key={journal.id}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden group"
                      >
                        <summary className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 bg-amber-50 cursor-pointer flex justify-between items-center hover:bg-amber-100 transition">
                          <span className="font-semibold text-amber-900 text-sm sm:text-base flex-1 pr-2">
                            {journal.title}
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {journal.year && (
                              <span className="text-xs text-amber-700">
                                ({journal.year})
                              </span>
                            )}
                            <FiChevronDown
                              className="text-amber-900 transition-transform duration-200 group-open:rotate-180"
                              size={16}
                            />
                          </div>
                        </summary>
                        <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 border-t border-amber-200 bg-yellow-50 space-y-1">
                          <p className="text-xs sm:text-sm text-gray-700">
                            {journal.authors}
                          </p>
                          <p className="text-xs sm:text-sm italic text-gray-600">
                            {journal.journal}
                          </p>
                          {journal.url && (
                            <a
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-xs sm:text-sm mt-1"
                            >
                              View Publication{" "}
                              <FiExternalLink className="ml-1" size={12} />
                            </a>
                          )}
                        </div>
                      </details>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Conferences */}
          <TabsContent value="conference" className="space-y-6 sm:space-y-8">
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
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-900 border-b border-amber-300 pb-2">
                    {title}
                  </h3>

                  {confs.length === 0 && (
                    <p className="text-xs sm:text-sm text-gray-500">
                      No conferences found.
                    </p>
                  )}

                  {confs.map((conf) => {
                    const year = extractYear(conf.details);

                    return (
                      <details
                        key={conf.id}
                        className="bg-white border border-amber-200 rounded-lg shadow-sm overflow-hidden group"
                      >
                        <summary className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 bg-amber-50 hover:bg-amber-100 cursor-pointer transition">
                          <div className="text-left flex-1 pr-2">
                            <h4 className="font-semibold text-amber-900 text-sm sm:text-base">
                              {conf.title.length > 60
                                ? conf.title.slice(0, 60) + "..."
                                : conf.title}
                            </h4>
                            {year && (
                              <span className="text-xs text-amber-700 flex items-center gap-1 mt-0.5">
                                <FiCalendar size={12} />
                                {year}
                              </span>
                            )}
                          </div>
                          <span className="ml-2 text-amber-900 flex-shrink-0">
                            <FiChevronDown
                              className="transition-transform duration-200 group-open:rotate-180"
                              size={16}
                            />
                          </span>
                        </summary>

                        <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3 border-t border-amber-200 bg-yellow-50">
                          <p className="text-xs sm:text-sm text-gray-700 mb-1">
                            {conf.authors}
                          </p>
                          <p className="text-xs sm:text-sm italic text-gray-600 mb-1">
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
                              className="mt-2 inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline text-xs sm:text-sm"
                            >
                              <FiExternalLink className="mr-1" size={12} />
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

          {/* Books */}
          <TabsContent
            value="books"
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            <SectionWrapper title="Authored Books">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {books.map((book, index) => (
                  <div
                    key={book.id}
                    className={`flex flex-col justify-between rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition bg-white border ${
                      index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
                    }`}
                  >
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <h3 className="text-amber-900 font-semibold text-sm sm:text-base lg:text-lg mb-1">
                        {book.title}
                      </h3>
                      {book.course && (
                        <p className="text-xs sm:text-sm text-yellow-900 mb-1">
                          {book.course}
                        </p>
                      )}
                      {book.publisher && (
                        <p className="text-xs text-amber-700 mb-2 sm:mb-3">
                          Published by:{" "}
                          <span className="font-medium">{book.publisher}</span>
                        </p>
                      )}
                      {book.link && (
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-block text-center bg-amber-800 text-white py-1.5 sm:py-2 rounded-lg hover:bg-amber-900 transition font-medium text-xs sm:text-sm"
                        >
                          Link{" "}
                          <FiExternalLink className="inline ml-1" size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            <SectionWrapper title="Book Chapters">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {bookChapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className={`flex flex-col justify-between rounded-xl shadow-md p-3 sm:p-4 lg:p-5 border transition-transform duration-200 hover:scale-105 ${
                      index % 2 === 0 ? "border-amber-200" : "border-yellow-200"
                    } bg-white dark:bg-slate-800`}
                  >
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-amber-900">
                        {chapter.chapterTitle}
                      </h3>
                      <p className="italic text-slate-700 text-xs sm:text-sm">
                        {chapter.bookTitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Year: {chapter.year}
                      </p>
                      {chapter.doi && (
                        <p className="text-xs sm:text-sm text-slate-500">
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
                        <p className="text-xs sm:text-sm text-slate-500">
                          ISBN:{" "}
                          <span className="font-medium">{chapter.isbn}</span>
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-500">
                        Co-Authors:{" "}
                        <span className="font-medium">{chapter.coAuthors}</span>
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        {chapter.scopusLink && (
                          <a
                            href={chapter.scopusLink}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Scopus
                          </a>
                        )}
                        {chapter.crossrefLink && (
                          <a
                            href={chapter.crossrefLink}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Crossref
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </TabsContent>

          {/* Patents */}
          <TabsContent value="patents" className="space-y-6 sm:space-y-8">
            {["granted", "published", "filed"].map((status) => (
              <InfoBlock key={status} color="amber">
                <SectionWrapper
                  title={`${
                    status.charAt(0).toUpperCase() + status.slice(1)
                  } Patents`}
                >
                  {patents.filter((p) => p.status === status).length === 0 ? (
                    <div className="mt-3 sm:mt-4 border-l-4 border-amber-400 pl-3 sm:pl-4 bg-amber-50 rounded-xl p-4 sm:p-5 lg:p-6 shadow-md">
                      <h3 className="font-semibold text-base sm:text-lg text-yellow-900">
                        Under construction
                      </h3>
                    </div>
                  ) : (
                    patents
                      .filter((p) => p.status === status)
                      .map((patent, idx) => (
                        <div
                          key={patent.id}
                          className="mt-3 sm:mt-4 border-l-4 border-amber-400 pl-3 sm:pl-4 bg-amber-50 rounded-xl p-4 sm:p-5 lg:p-6 shadow-md space-y-1.5 sm:space-y-2"
                        >
                          <h3 className="font-semibold text-base sm:text-lg text-yellow-900">
                            {patent.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-yellow-800">
                            {patent.publishedDate &&
                              `Published on ${patent.publishedDate}`}{" "}
                            {patent.applicationNumber &&
                              `, Application Number: ${patent.applicationNumber}`}
                          </p>
                          {patent.url && (
                            <a
                              href={patent.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-700 hover:text-amber-900 hover:underline inline-flex items-center text-xs sm:text-sm font-medium"
                            >
                              Patent Link{" "}
                              <FiExternalLink className="ml-1" size={12} />
                            </a>
                          )}
                        </div>
                      ))
                  )}
                </SectionWrapper>
              </InfoBlock>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
