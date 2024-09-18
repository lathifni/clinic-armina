import { FC } from "react";
import Image from "next/image";

const OrganizationStructure: FC = () => {
  return (
    <section className="bg-blueLigth p-8 sm:p-12 md:p-16 space-y-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <header className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold col-span-1 md:col-span-2 text-slate-800 uppercase">
        <h1>Struktur Organisasi</h1>
      </header>
      <Image
        src="https://klinikmatapandaan.com/asset/kcfinder/upload/files/Skema%20Struktur%20Organisasi%20dg%20Nama_001.png"
        width={1000}
        height={1000}
        alt="struktur"
        className="w-full mx-auto h-56 sm:h-72 md:h-80 lg:h-96"
      />
    </section>
  );
};

export default OrganizationStructure;
