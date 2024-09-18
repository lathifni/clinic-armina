import { FC } from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, className = "" }) => {
  return (
    <header className={`text-center uppercase ${className}`}>
      <h1 className="text-slate-950 font-bold text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h1>
    </header>
  );
};

export default SectionHeader;
