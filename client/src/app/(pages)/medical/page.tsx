import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Medical: NextPage<Props> = ({}) => {
  return (
    <section className="bg-blueLigth pb-12 space-y-12">
      <div className="w-full h-96 overflow-hidden">
        <Image
          src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
          alt="medical"
          height={1000}
          width={1000}
          className="w-full bg-cover h-auto bg-blueLigth"
        />
      </div>
      <article className="bg-white container   rounded-xl p-12 text-center grid grid-cols-2 gap-12 text-white">
        <h2 className="font-bold text-xl col-span-2 text-slate-950">
          Tenaga Medis
        </h2>
        <article className="col-span-1 rounded-lg bg-blueCustom overflow-hidden ">
          <div className="w-full h-64 overflow-hidden">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-max bg-cover h-auto bg-blueLigth"
            />
          </div>
          <div className="px-4 py-5 font-bold text-left text-lg">
            <p>dr. Gilang Kharisma</p>
            <p className="font-normal">7 a.m - 5 p.m</p>
            <p>Dokter umum</p>
          </div>
        </article>
        <article className="col-span-1 rounded-lg bg-blueCustom overflow-hidden ">
          <div className="w-full h-64 overflow-hidden">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-max bg-cover h-auto bg-blueLigth"
            />
          </div>
          <div className="px-4 py-5 font-bold text-left text-lg">
            <p>dr. Gilang Kharisma</p>
            <p className="font-normal">7 a.m - 5 p.m</p>
            <p>Dokter umum</p>
          </div>
        </article>
        <article className="col-span-1 rounded-lg bg-blueCustom overflow-hidden ">
          <div className="w-full h-64 overflow-hidden">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-max bg-cover h-auto bg-blueLigth"
            />
          </div>
          <div className="px-4 py-5 font-bold text-left text-lg">
            <p>dr. Gilang Kharisma</p>
            <p className="font-normal">7 a.m - 5 p.m</p>
            <p>Dokter umum</p>
          </div>
        </article>
        <article className="col-span-1 rounded-lg bg-blueCustom overflow-hidden ">
          <div className="w-full h-64 overflow-hidden">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-max bg-cover h-auto bg-blueLigth"
            />
          </div>
          <div className="px-4 py-5 font-bold text-left text-lg">
            <p>dr. Gilang Kharisma</p>
            <p className="font-normal">7 a.m - 5 p.m</p>
            <p>Dokter umum</p>
          </div>
        </article>
 
      </article>
    </section>
  );
};

export default Medical;
