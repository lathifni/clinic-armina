import { FacilityItem } from "@/components/facility/FacilityItem";
import { NextPage } from "next"; 

interface Props {}

const Facility: NextPage<Props> = ({}) => {
  return (
    <section className="py-12 mx-auto bg-white">
      <header className="text-4xl font-bold text-center py-12">
        <h2>Fasilitas</h2>
      </header>
      <section className=" max-w-5xl mx-auto space-y-12" aria-label="facilities">
         <FacilityItem />
      </section>
    </section>
  );
};

export default Facility;
