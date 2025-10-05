import { Card, CardContent } from "@/components/ui/card";
import InfoBlock from "../InfoBlock";
import SectionWrapper from "../SectionWrapper";
import { FiBriefcase, FiExternalLink, FiMapPin } from "react-icons/fi";

interface CorporateConnection {
  company: string;
  role: string | null;
  duration: string | null;
  description: string | null;
  logoUrl: string | null;
}

interface CorporateSectionProps {
  data: CorporateConnection[];
}

export function CorporateSection({ data }: CorporateSectionProps) {

  const industryVisits = [
  { name: "Mag Power, Pune", link: "https://magpowerpune.com/" },
  { name: "Revogreen Technologies Pvt. Ltd., Pune", link: "https://revogreen.in/" },
  { name: "Halliburton, Pune", link: "https://www.halliburton.com/" },
  { name: "H. B. Fuller", link: "https://www.hbfuller.com/" },
  { name: "Intenics Private Limited, Jabalpur", link: "https://intenics.in/" }
];
  return (
    <section id="corporate" className="py-16 bg-white dark:bg-slate-950">
      <div className="space-y-10">
        {/* Main Heading */}
        <h2 className="text-5xl font-extrabold text-center text-amber-900 mb-14 tracking-wide pt-[23px] pb-[20px]">
          Corporate Connections
        </h2>

        {/* Box Wrapper */}
        <div className="border border-amber-200 rounded-xl shadow-md p-6 bg-white dark:bg-slate-900 max-w-6xl mx-auto space-y-8">
          {/* Collaborations & Internships */}
          <InfoBlock color="amber">
            <SectionWrapper>
              <div className="flex items-center gap-2 mb-4 text-yellow-900">
                <FiBriefcase size={22} />
                <span className="font-semibold">
                  Collaborations & Student Internships
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((connection, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 dark:bg-slate-800 border border-amber-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col items-start"
                  >
                    <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-400 mb-1">
                      {connection.company}
                    </h3>
                    {connection.role && (
                      <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-1">
                        {connection.role}
                      </p>
                    )}
                    {connection.duration && (
                      <p className="text-xs text-yellow-700 dark:text-yellow-200 mb-2">
                        {connection.duration}
                      </p>
                    )}
                    {connection.description && (
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        {connection.description}
                      </p>
                    )}
                    {connection.logoUrl && connection.logoUrl.trim() !== "" && (
                      <a
                        href={connection.logoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 hover:underline text-sm"
                      >
                        Company Website{" "}
                        <FiExternalLink className="ml-1" size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </InfoBlock>

          <InfoBlock color="amber">
            <SectionWrapper title="Industry Visits Organized">
              <div className="flex items-center gap-2 mb-3 text-yellow-900">
                <FiMapPin size={22} />
                <span className="font-semibold">
                  Practical Exposure & Site Visits
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {industryVisits.map((visit, j) => (
                  <div
                    key={j}
                    className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-100 transition"
                  >
                    {visit.link && visit.link.trim() !== "" ? (
                      <a
                        href={visit.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-700 hover:text-amber-900 hover:underline"
                      >
                        {visit.name}
                        <FiExternalLink className="ml-1" size={14} />
                      </a>
                    ) : (
                      <span className="text-amber-700">{visit.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </InfoBlock>
          {/* You can add another sub-section if needed */}
          {/* Example: Practical Exposure & Site Visits */}
          {/* <InfoBlock color="amber">
        <SectionWrapper title="Industry Visits">
          ...
        </SectionWrapper>
      </InfoBlock> */}
        </div>
      </div>
    </section>
  );
}
