import React from "react";
import Image from "next/image";
import { baseUrl } from "@/lib/baseUrl";

interface BrochureSchema {
  id: number;
  image: string;
  layanan_id: number;
}

interface GaleriProps {
  brocure: BrochureSchema[];
}

const Galeri: React.FC<GaleriProps> = ({ brocure }) => {
  return (
    <section className="rounded-3xl max-w-7xl mx-auto text-5xl text-center bg-blueLigth shadow-[2px_2px_16px_1px_#0766AD] space-y-4 p-8">
      <h2 className="mx-auto w-fit p-8 border-b border-[#0766AD]"> Galeri</h2>

      <article className="grid grid-cols-3 justify-items-center   ">
        {brocure?.slice(0, 3).map((data: BrochureSchema, index: number) => (
          <Image
            key={index}
            src={baseUrl + data.image}
            alt="galery"
            height={1500}
            width={1500}
            className=" max-h-72 w-auto"
          />
        ))}
      </article>
      <h2 className="mx-auto w-fit px-8 border-t h-0 overflow-hidden border-[#0766AD] text-transparent">
        Galeri 
      </h2>

      <p className="text-base text-right text-blueCustom font-serif">
        selengkapnya &gt; &gt;{" "}
      </p>
    </section>
  );
};

export default Galeri;
