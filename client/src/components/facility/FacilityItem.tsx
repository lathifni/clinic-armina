"use client";
import { FacilityImage } from "@/components/facility/FacilityImage";
import { FacilityDetail } from "@/components/facility/FacilityDetail";
import { useFetchFacilities } from "@/features/useFetchFacilities";
import { ImageSkeleton } from "../skeleton/ImageSkeleton";
import { DataNotAvailable } from "../common/DataNotAvailable";

type FacilityItemsSchema = {
  id: number;
  nama: string;
  image: string;
  deskripsi: string;
};

export const FacilityItem = () => {
  const { data, isLoading, isError } = useFetchFacilities();

  return !isError?!isLoading?data?.data?.map((facility: FacilityItemsSchema) => (
    <article
      key={facility.id}
      className="flex lg:even:flex-row-reverse flex-col lg:items-start justify-center items-center  lg:flex-row rounded-3xl border-4 border-lightGreen shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-8 gap-8 bg-blueLigth"
    >
      <FacilityImage src={facility.image} />
      <FacilityDetail title={facility.nama} desc={facility.deskripsi} />
    </article>
  )):<ImageSkeleton/>:<DataNotAvailable/>;
};
