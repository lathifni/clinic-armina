import { FC } from "react";

interface VisionMissionProps {
  vision: string[];
  mission: string[];
}

const VisionMission: FC<VisionMissionProps> = ({ vision, mission }) => {
  return (
    <section className="bg-blueLigth p-8 sm:p-12 md:p-16 space-y-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <header className="text-3xl sm:text-3xl lg:text-4xl text-center font-bold col-span-1 md:col-span-2 text-slate-800 uppercase">
        <h1>Visi dan Misi</h1>
      </header>
      
      <article className="space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 text-center font-bold">
          Visi
        </h1>
        <ul className="list-decimal px-6 text-sm sm:text-base lg:text-lg text-justify">
          {vision.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </article>
      
      <article>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 text-center font-bold">
          Misi
        </h1>
        <ul className="list-decimal px-6 text-sm sm:text-base lg:text-lg text-justify">
          {mission.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default VisionMission;
