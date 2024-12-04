"use client";

import { useFetchLayanan } from "@/features/useFetchLayanan";
import {ImageSkeleton} from "@/components/skeleton/ImageSkeleton";
import Image from "next/image";
import { baseUrl } from "@/lib/baseUrl";

type LayananSchema = {
id: number;
  nama: string;
  image: string;
  deskripsi: string;
};
export default function ServiceSection() {
  const { data, isLoading } = useFetchLayanan()
 ;
 
  const renderLayanan = () => {
    return data?.data?.map((layanan: LayananSchema) => (
      <div
        key={layanan.id}
        className="rounded-2xl shadow-md shadow-cyan-700  bg-blueCustom"
      >
        <Image
          className="max-w-full h-auto"
          src={`${baseUrl}${layanan.image}`}
          alt={`img layanan ${layanan.id}`}
          width={500}
          height={500}
        />
        <div>
          <h3>{layanan.nama}</h3>
          <p>{layanan.deskripsi}</p>
        </div>
      </div>
    ));
  };
  return (
    <section className="text-[#333333] text-center text-[32px] sm:text-[36px] lg:text-[44px] px-4 sm:px-16 lg:px-20 py-12 sm:py-16 lg:py-20 space-y-10">
      <strong>Layanan Kami</strong>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {renderLayanan()}
        {isLoading && (
        [1,2,3].map((index)=>(<ImageSkeleton key={index}/>))        
        )}
      </div>
    </section>
  );
}
