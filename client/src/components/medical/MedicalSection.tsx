'use client'
import { MedicalItem } from "@/components/medical/MedicalItem";
import { useFetchMedical } from "@/features/useFetchMedical";

type MedicSchema = {
  id: number;
  nama: string;
  jenis: string;
  image: string;
  deskripsi: string;
  waktu_mulai: string;
  waktu_selesai: string;
};

export const MedicalSection = () => {
  const { data } = useFetchMedical();

  const RenderMedic = () => {
    return data?.data?.map((medic: MedicSchema) => (
      <MedicalItem key={medic.id} medic={medic} />
    ));
  };

  return (
    <article className="bg-white container py-12 min-w-96 rounded-xl px-4 sm:px-6 md:px-12 lg:px-24 max-w-5xl text-center grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 text-white">
      <h2 className="font-bold text-xl col-span-1 sm:col-span-2 text-slate-950">
        Tenaga Medis
      </h2>
      {RenderMedic()}
    </article>
  );
};
