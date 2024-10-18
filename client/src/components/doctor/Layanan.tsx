import React from "react";

type SubLayanan = {
  id: number;
  nama: string;
  layanan_id: number;
};

interface LayananProps {
  subLayanan: SubLayanan[];
}

const Layanan: React.FC<LayananProps> = ({ subLayanan }) => {
    const RenderLayanan = () => {
        return subLayanan?.map((data: SubLayanan) => (
          <p
            key={data.id}
            className="bg-blueCustom text-white rounded-3xl px-20 font-bold py-1 shadow-custom"
          >
            {data.nama}
          </p>
        ));
      };

  return (
    <article className="text-center bg-blueLigth w-fit space-y-2 mx-auto px-24 py-8 rounded-2xl border border-lightGreen shadow-[0_4px_4px_0_rgba(0,0,0,0.25),24px_22px_0_0_theme(colors.lightGreen)]">
    <header className="mb-8">
      <h2 className="bg-white rounded-3xl py-2 font-bold w-24 mx-auto shadow-custom">
        Layanan
      </h2>
    </header>
    {RenderLayanan()}
  </article>
  );
};

export default Layanan;
