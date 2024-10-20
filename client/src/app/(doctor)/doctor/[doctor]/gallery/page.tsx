'use client'
import { useFetchGalleries } from "@/features/useFetchGallery";
import { useFilterData } from "@/features/useFilterData";
import { baseUrl } from "@/lib/baseUrl";
import { NextPage } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Props {}

const Gallery: NextPage<Props> = ({}) => {
  const {doctor} = useParams()
  const {data} = useFetchGalleries()
  console.log(data)
  const filteredGallery = useFilterData(data?.data,doctor.toString())
  const RenderGallery = ()=>{
    return filteredGallery?.map((g:any) => (
      <div key={g.id}>
        <Image
          src={baseUrl+g.image}
          alt="galery"
          height={1500}
          width={1500}
          className="rounded "
        />
      </div>
    ))
  }
  console.log(doctor)
  return (
    <section className="container p-8 max-w-5xl">
      <section className="rounded-3xl text-5xl text-center p bg-blueLigth shadow-[2px_2px_16px_1px_#0766AD] space-y-12 p-12">
        <h2 className="mx-auto w-fit p-8 border-b border-[#0766AD]"> Galeri</h2>

        <article className={`grid grid-cols-1 md:grid-cols-${filteredGallery?.length<3?filteredGallery?.length:'3'} justify-items-center gap-8 `}>
        <RenderGallery />
        </article>
        

      </section>
    </section>
  );
};

export default Gallery;
