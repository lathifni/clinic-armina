import { baseUrl } from "@/lib/baseUrl"
import Image from "next/image"

export const ServiceImage = ({src}:{src:string})=>{
    return    <figure>
    <Image
      src={baseUrl+src}
      alt="service"
      width={1000}
      height={1000}
      className="w-max"
    />
  </figure>
}