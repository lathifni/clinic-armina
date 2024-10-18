import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";

type MedicSchema = {
  id: number;
  nama: string;
  jenis: string;
  image: string;
  deskripsi: string;
  waktu_mulai: string;
  waktu_selesai: string;
};

export const MedicalItem = ({ medic }: { medic: MedicSchema }) => {
  return (
    <article className="col-span-1   rounded-lg bg-blueCustom overflow-hidden">
      <div className="w-full h-64 overflow-hidden">
        <Image
          src={`${baseUrl}${medic.image}`}
          alt={medic.nama}
          height={1000}
          width={1000}
          className="w-max bg-cover h-auto bg-blueLigth"
        />
    </div>
      <div className="px-4 py-5 font-bold text-left h-fit text-lg">
        <p>{medic.nama}</p>
        <p className="font-normal">{medic.waktu_mulai} - {medic.waktu_selesai}</p>
        <p className="font-semibold">{medic.jenis}</p>
      </div>
    </article>
  );
};
