"use client";

import { useState } from "react";
import { useFetchLayanan } from "@/features/useFetchLayanan";
import Link from "next/link";
import Loading from "../common/Loading";

type DoctorSchema = {
  id: number;
  name: string;
};

export const MainSection = () => {
  const { data, isLoading, isError } = useFetchLayanan();
  const [showAll, setShowAll] = useState(false);

  const RenderLink = () => {
    if (!data?.data) return null;

    const doctorsToShow = showAll ? data.data : data.data.slice(0, 2);
    return (
      <>
        {doctorsToShow.map((doctor: DoctorSchema) => (
          <Link
            key={doctor.id}
            className="bg-blueCustom p-2 sm:p-3 rounded-lg sm:rounded-xl"
            href={"/doctor/" + doctor.id}
          >
            {doctor.name}
          </Link>
        ))}
        {!showAll && data.data.length > 2 && (
          <button
            onClick={() => setShowAll(true)}
            className="bg-blueCustom p-2 sm:p-3 rounded-lg sm:rounded-xl"
          >
            Show more &gt; &gt;
          </button>
        )}
      </>
    );
  };

  return (
    <div className="bg-[url(https://arminaskincare.com/wp-content/uploads/2019/03/cabang-armina-1.jpg)] bg-cover">
      <section className="shadow-md bg-green-200/40 h-screen  px-4 sm:px-24 lg:px-64 flex flex-col justify-center space-y-4 sm:space-y-8">
        <i
          className="font-sans font-bold text-3xl sm:text-5xl lg:text-7xl"
          style={{ fontFamily: "Racing Sans One" }}
        >
          Klinik Armina
        </i>
        <div className="flex w-fit text-center flex-col md:flex-row gap-2">
          {!isError && !isLoading ? <RenderLink /> : <Loading />}
     
        </div>
      </section>
    </div>
  );
};
