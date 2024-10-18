"use client";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { ServiceImage } from "@/components/service/ServiceImage";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan";
import { useFilterData } from "@/features/useFilterData";

import { NextPage } from "next";



interface Props {
  params: {
    doctor: number;
  };
}

const Service: NextPage<Props> = ({ params }) => {
  const { doctor } = params;

  const { data, isLoading, isError } = useFetchSubLayanan();
  const layanan = useFilterData(data?.data, doctor);
 
  const RenderLayanan = () => {
    return layanan?.map((l: any) => {
      return (
        <article
          key={l.id}
          className="grid md:grid-cols-2  container gap-12 items-stretch content-stretch border-b-2 border-blueCustom py-12"
        >
          <ServiceImage src={l.image} />
          <ServiceDetail
            nama={l.nama}
            harga={l.harga}
            deskripsi={l.deskripsi}
          />
        </article>
      );
    });
  };
 
  return <section className="container max-w-5xl bg-white  py-8">{RenderLayanan()}</section>;
};

export default Service;
