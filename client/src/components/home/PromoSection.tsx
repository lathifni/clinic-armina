"use client";
import { useFetchPromo } from "@/features/useFetchPromo";
import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";
import Slider from "react-slick"; 
import { DataNotAvailable } from "../common/DataNotAvailable";
import { ImageSkeleton } from "../skeleton/ImageSkeleton";

export default function PromoSection() {
  const { data, isLoading, isError } = useFetchPromo();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const RenderPromo = () => (
    <Slider {...settings}>
      {data?.data?.map((item: any, index: number) => (
        <Image
          key={index}
          className="h-[100vh] object-contain"
          width={1000}
          height={1000}
          src={`${baseUrl}${item.image}`}
          alt={`gambar promo ${index}`}
          loading="lazy"
        />
      ))}
    </Slider>
  );

  return (
    <section className="shadow-inner overflow-hidden   shadow-slate-500 bg-cyan-500/10 h-screen">
      <div className=" overflow-hidden    ">
        {!isError ? (
          !isLoading ? (
            <RenderPromo />
          ) : (
            <ImageSkeleton />
          )
        ) : (
          <DataNotAvailable />
        )}
      </div>
    </section>
  );
}
