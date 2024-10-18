import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { baseUrl } from "@/lib/baseUrl";

interface BrochureSchema {
  id: number;
  image: string;
  layanan_id: number;
}

interface SliderBrochureProps {
  brocure: BrochureSchema[];
}

const HeaderSlider: React.FC<SliderBrochureProps> = ({ brocure }) => {
  const [activeSlide, setActiveSlide] = useState(0);

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

  return (
    <Slider {...settings}>
      {brocure?.map((data: BrochureSchema, index: number) => (
        <div className="py-8" key={data.id}>
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
  );
};

export default HeaderSlider;
