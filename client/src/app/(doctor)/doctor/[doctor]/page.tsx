"use client";
import { NextPage } from "next";
import React from "react";
import { useFetchBrocures } from "@/features/useFetchBrocures";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan";
import { useFetchTestimoni } from "@/features/useFetchTestimoni";
import HeaderSlider from "@/components/doctor/HeaderSlider";
import Layanan from "@/components/doctor/Layanan";
import Testimoni from "@/components/doctor/Testimoni";
import Galeri from "@/components/doctor/Galeri";
import { useFilterData } from "@/features/useFilterData";

interface BrochureSchema {
  id: number;
  image: string;
  layanan_id: number;
}

type SubLayanan = {
  id: number;
  nama: string;
  layanan_id: number;
};

type TestimoniSchema = {
  id: number;
  nama: string;
  isi: string;
  layanan_id: number;
};
const Practitioner = ({ params }: { params: { doctor: number } }) => {
  const { data: fetchBrochure, isLoading: brochureLoading } = useFetchBrocures();
  const { data: fetchSubLayanan, isLoading: layananLoading } = useFetchSubLayanan();
  const { data: fetchTestimoni, isLoading: testimoniLoadingLoading } = useFetchTestimoni();

  const { doctor } = params;

  const brocure = useFilterData(fetchBrochure?.data, doctor)
  const subLayanan = useFilterData(fetchSubLayanan?.data, doctor)
  const testimoni = useFilterData(fetchTestimoni?.data, doctor)



  return (
    <section className="container bg-white pb-16 space-y-12">
      <header className="bg-blueLigth shadow border-4 max-w-5xl h-calc-auto transition duration-300 ease-linear mx-auto rounded-2xl p-3 border-lightGreen">
        <HeaderSlider brocure={brocure} />
      </header>
      <section className="container py-20">
        <Layanan subLayanan={subLayanan} />
      </section>
      <section>
        <Testimoni testimoni={testimoni} />
      </section>
      <Galeri brocure={brocure} />
    </section>
  );
};

export default Practitioner;
