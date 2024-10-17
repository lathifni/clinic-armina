import Image from "next/image";

// components/MainSection.tsx
export default function MainSection() {
  return (
      <div className="bg-[url(https://arminaskincare.com/wp-content/uploads/2019/03/cabang-armina-1.jpg)] bg-cover">
      <section className="shadow-md bg-green-200/40 h-screen  px-4 sm:px-24 lg:px-64 flex flex-col justify-center space-y-4 sm:space-y-8">
      <i
        className="font-sans font-bold text-3xl sm:text-5xl lg:text-7xl"
        style={{ fontFamily: "Racing Sans One" }}
      >
        Klinik Armina


      </i>
      <div className=" sm:space-x-8 font-bold max-sm:grid max-sm:grid-cols-1 max-sm:gap-2">
        <a className="bg-blueCustom p-2 sm:p-3 rounded-lg sm:rounded-xl" href="#dokterUmum">
          Dokter Umum
        </a>
        <a className="bg-blueCustom p-2 sm:p-3 rounded-lg sm:rounded-xl" href="#dokterGigi">
          Dokter Gigi
        </a>
        <a className="bg-blueCustom p-2 sm:p-3 rounded-lg sm:rounded-xl" href="#khitanCenter">
          Khitan Center
        </a>
      </div>
    </section>  
        </div>
    );
  }
  