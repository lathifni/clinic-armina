'use client'
import { useFetchBrocures } from '@/features/useFetchBrocures';
import { baseUrl } from '@/lib/baseUrl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
 
import Slider from 'react-slick';

const Brochure = () => {
  const [small, setSmall] = useState(false);
  const { data, isLoading, isError } = useFetchBrocures(); 

  let sliderRef = useRef<Slider | null>(null);

 
  const handleResize = () => {
 
    setSmall(window.innerWidth <= 	1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: data?.data?.length < 3 || small ? 1 : 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // centerPadding: "30px",
    // centerMode:true
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const RenderBrocures = () => {
    return data?.data?.map((promo: { image: string }) => (
      <Image
        key={promo.image}
        src={baseUrl + promo.image}
        alt="Brochure"
        height={1500}
        width={1500}
        className="w-full md:rounded-xl sm:rounded-lg rounded lg:rounded-3xl"
      />
    ));
  };

  return (
    <section className={`container   py-16 space-y-10`}>
      <div className="slider-container max-w-6xl mx-auto  rounded-2xl p-8 bg-white  shadow">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...settings}
        >
          {RenderBrocures()}
        </Slider>
      </div>
      <div className="flex gap-4 justify-center  items-center text-lg">
        <button
          className="bg-blueCustom px-2  active:bg-lightGreen text-white py-1 rounded hover:bg-blue-900"
          onClick={previous}
        >
          <FaAngleLeft />           
        </button>
        <button
          className="bg-blueCustom px-2  active:bg-lightGreen text-white py-1 rounded hover:bg-blue-900"
          onClick={next}
        >
          <FaAngleRight />
        </button>
      </div>
    </section>
  );
};

export default Brochure;
