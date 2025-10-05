import React, { ReactNode } from "react";

interface SectionWrapperProps {
  title?: ReactNode; // Can be string or JSX
  children: ReactNode;
  className?: string; // Optional additional classes
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <section className={`space-y-6 ${className}`}>
      {title && (
        <div className="text-2xl font-bold text-amber-900 border-l-4 border-amber-400 pl-3">
          {title}
        </div>
      )}
      <div className="">{children}</div>
    </section>
  );
};

export default SectionWrapper;
