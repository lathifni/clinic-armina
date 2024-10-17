import { FC } from "react";
import VisionHeader from "./VisionHeader";
import VisionList from "./VisionList";
 

interface VisionMissionProps {
  vision: string[];
  mission: string[];
}

const VisionMission: FC<VisionMissionProps> = ({ vision, mission }) => {
  return (
    <section className="bg-blueLigth p-8 sm:p-12 md:p-16 space-y-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <VisionHeader title="Visi dan Misi" />
      <VisionList data={vision} title="vision" number={false}/>
      <VisionList data={mission} title="mission" number={true} />
    </section>
  );
};

export default VisionMission;
