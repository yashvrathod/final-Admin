import { Star } from "lucide-react";
import InfoBlock from "../InfoBlock";
import SectionWrapper from "../SectionWrapper";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatarUrl: string | null;
  rating: number | null;
  category: string; // "Industry Recognition", "Student & Alumni Reflections", "Collaborator Endorsements"
  createdAt: Date;
  updatedAt: Date;
  order: number;
  isActive: boolean;
}

interface TestimonialsSectionProps {
  data: Testimonial[];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const categories = [
    { key: "industry", title: "Industry Recognition" },
    { key: "students", title: "Student & Alumni Reflections" },
    { key: "collaborators", title: "Collaborator Endorsements" },
  ];

  return (
    <section className="relative w-full bg-gradient-to-r from-amber-50 to-yellow-100 border-amber-200 py-20">
      <div className="max-w-6xl mx-auto space-y-12 px-4">
        {/* Main Heading */}
        <h2 className="text-5xl font-extrabold text-center text-amber-900 mb-14 tracking-wide">
          Testimonials
        </h2>

        {/* Render Sections */}
        {categories.map((section) => {
          const sectionTestimonials = data.filter(
            (t) => t.category.toLowerCase() === section.key.toLowerCase()
          );

          return (
            <InfoBlock key={section.key} color="amber">
              <SectionWrapper title={section.title}>
                {sectionTestimonials.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-4">
                    No testimonials yet.
                  </p>
                ) : (
                  <div className="mt-4 flex gap-6 overflow-x-auto pb-2">
                    {sectionTestimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="inline-block min-w-[280px] max-w-sm bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 rounded-xl p-4 shadow-sm"
                      >
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-3 mb-2">
                          {testimonial.avatarUrl ? (
                            <img
                              src={testimonial.avatarUrl}
                              alt={testimonial.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-yellow-900 dark:text-yellow-100">
                              {testimonial.name}
                            </span>
                            {testimonial.role && (
                              <p className="text-xs text-yellow-700 dark:text-yellow-300 italic">
                                {testimonial.role}
                                {testimonial.company &&
                                  ` at ${testimonial.company}`}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rating */}
                        {testimonial.rating && testimonial.rating > 0 && (
                          <div className="flex gap-1 mb-2">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  aria-hidden="true"
                                />
                              )
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          {testimonial.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionWrapper>
            </InfoBlock>
          );
        })}
      </div>
    </section>
  );
}
