import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";

type FacilitySchema = {
    src: string; 
  };
export const FacilityImage = ({ src }: FacilitySchema)=>{
    return  <div className=" shrink overflow-hidden rounded-lg ">
    <Image
      src={`${baseUrl}${src}`}
      alt="medical"
      height={1000}
      width={1000}
      className="max-w-sm bg-blueLigth"
    />
  </div>
}