"use client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { GiDoctorFace } from "react-icons/gi";
import { useFetchBrocures } from "@/features/useFetchBrocures";
import { baseUrl } from "@/lib/baseUrl";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan";

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

const Practitioner = ({ params }: { params: { doctor: number } }) => {
  const {
    data: fetchBrochure,
    isLoading: brochureLoading,
    isError: brochureError,
  } = useFetchBrocures();
  const {
    data: fetchSubLayanan,
    isLoading: subLayananLoading,
    isError: subLayananError,
  } = useFetchSubLayanan();
  const [activeSlide, setActiveSlide] = useState(0);
  const { doctor } = params;
  const brocure = fetchBrochure?.data?.filter(
    (b: BrochureSchema) => b.layanan_id == doctor
  );
  const subLayanan = fetchSubLayanan?.data?.filter(
    (b: SubLayanan) => b.layanan_id == doctor
  );

  const settings = {
    infinite: true,
    slidesToShow: brocure?.length <= 3 ? 1 : 3,
    speed: 500,
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerPadding: "0px",
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };
  const settingsTestimoni = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // Remove arrows if you don't need them
  };
  const testimonials = [
    {
      name: "Nefa The Explorer",
      content:
        "lg tahap renovasi. jd besar ini tempatnya. sayang ga kerjasama dengan bpjs. klo kerja sama dengan bpjs di jamin tambah ramai orang yg berobat disini.",
    },
    {
      name: "Edwan Nurvickta",
      content:
        "Istri lahiran disini, Anak sakit dirawat disini, fasilitas nyaman, pelayanan memuaskan, ramah, di semua lini dsri dokter, sampai yang bersih2, mantap. dan yang paling penting harga bersahabat.",
    },
  ];

  const RenderLayanan = () => {
    return subLayanan?.map((data: SubLayanan) => (
      <p
        key={data.id}
        className="bg-blueCustom text-white rounded-3xl px-20 font-bold py-1 shadow-custom"
      >
        {data.nama}
      </p>
    ));
  };

  return (
    <section className="container pb-16 space-y-12">
      <header className=" bg-blueLigth border-4 max-w-5xl h-calc-auto transition duration-300 ease-linear mx-auto rounded-2xl p-3  border-lightGreen">
        <div className="slider-container container  mx-auto bg-white rounded-xl  ">
          <Slider {...settings}>
            {brocure?.map((data: BrochureSchema, index: number) => (
              <div className="py-8 " key={data.id}>
                <Image
                  src={baseUrl + data.image}
                  alt={`Brochure ${data.id}`}
                  height={1500}
                  width={1500}
                  className={`rounded w-max max-h-72 mx-auto h-auto transition-transform duration-300 ${
                    index === activeSlide ? "scale-[1.05]" : "scale-95"
                  }`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </header>
      <section className="container py-20">
        <article className="text-center bg-blueLigth w-fit space-y-2 mx-auto px-24 py-8 rounded-2xl border border-lightGreen shadow-[0_4px_4px_0_rgba(0,0,0,0.25),24px_22px_0_0_theme(colors.lightGreen)]">
          <header className="mb-8">
            <h2 className="bg-white rounded-3xl py-2 font-bold w-24 mx-auto shadow-custom">
              Layanan
            </h2>
          </header>
          {RenderLayanan()}
        </article>
      </section>
      <section>
        <div className="bg-white py-10 space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">Testimoni</h2>

          <div className="">
            <hr className="border-b-[3px] border-purple-500 w-12 rounded-sm mx-auto  " />
            <hr className="w-40 mx-auto border-t-2" />
          </div>
          <Slider {...settingsTestimoni}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex justify-center  p-2 ">
                <div className="max-w-xl bg-gray-50 p-8 mx-auto shadow-custom rounded-md ">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-purple-500">😊</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="rounded-3xl text-5xl text-center bg-blueLigth shadow-[2px_2px_16px_1px_#0766AD] space-y-12 p-16">
        <h2 className="mx-auto w-fit p-8 border-b border-[#0766AD]"> Galeri</h2>

        <article className="grid grid-cols-3 justify-items-center   ">
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="size-48 "
          />
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="size-48 "
          />
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="size-48 "
          />
        </article>
        <h2 className="mx-auto w-fit px-8 border-t h-0 overflow-hidden border-[#0766AD] text-transparent">
          Galeri
        </h2>

        <p className="text-base text-right text-blueCustom font-serif">
          selengkapnya &gt; &gt;{" "}
        </p>
      </section>
    </section>
  );
};

export default Practitioner;
