import { FC } from "react";

interface VisionHeaderProps {
  title: string;
}

const VisionHeader: FC<VisionHeaderProps> = ({ title }) => {
  return (
    <header className="text-3xl sm:text-3xl lg:text-4xl text-center font-bold col-span-1 md:col-span-2 text-slate-800 uppercase">
      <h1>{title}</h1>
    </header>
  );
};

export default VisionHeader;
