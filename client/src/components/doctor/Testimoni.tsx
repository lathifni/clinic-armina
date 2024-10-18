import React from "react";
import Slider from "react-slick";

type TestimoniSchema = {
  id: number;
  nama: string;
  isi: string;
  layanan_id: number;
};

interface TestimoniProps {
  testimoni: TestimoniSchema[];
}

const Testimoni: React.FC<TestimoniProps> = ({ testimoni }) => {
  const settingsTestimoni = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="bg-blueLigth max-w-7xl mx-auto rounded-2xl px-4 py-10 space-y-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Testimoni</h2>

      <div className="">
        <hr className="border-b-[3px] border-purple-500 w-12 rounded-sm mx-auto  " />
        <hr className="w-40 mx-auto border-t-2" />
      </div>
      <Slider {...settingsTestimoni}>
        {testimoni?.map((data: TestimoniSchema) => (
          <div key={data.id} className="flex justify-center p-2">
            <div className="max-w-xl bg-gray-50 p-8 mx-auto shadow-custom rounded-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-purple-500">😊</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{data.nama}</h3>
                </div>
              </div>
              <p className="text-gray-700">{data.isi}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimoni;
