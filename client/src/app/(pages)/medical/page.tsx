'use client'
import { MedicalSection } from "@/components/medical/MedicalSection";
import { useFetchMedical } from "@/features/useFetchMedical";
import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Medical: NextPage<Props> = ({}) => {
 
  return (
    <section className="bg-blueLigth pb-12 space-y-12">
      <header className="w-full h-96 overflow-hidden">
        <Image
          src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
          alt="medical"
          height={1000}
          width={1000}
          className="w-full bg-cover h-auto bg-blueLigth"
        />
      </header>
      <MedicalSection />
    </section>
  );
};

export default Medical;
