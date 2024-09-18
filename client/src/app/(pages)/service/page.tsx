import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Service: NextPage<Props> = ({}) => {
  return (
    <section className="container py-16">
      <article className="grid grid-cols-2 container gap-12 items-stretch content-stretch border-b-2 border-blueCustom py-12">
        <figure>
          <Image
            src="https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16828353470227422.webp"
            alt="service"
            width={1000}
            height={1000}
            className="w-max"
          />
        </figure>
        <article className="col-span-1 flex justify-between flex-col text-justify text-lg  ">
          <div className="space-y-4">
            <h2 className="capitalize font-bold text-xl ">
              Test bebas narkoba
            </h2>
            <p className="first-letter:capitalize ">
              prosedur pemeriksaan kesehatan menyeluruh yang dilakukan oleh
              praktisi kesehatan. Medical check-up dapat mendeteksi adanya
              gejala, potensi, dan tanda-tanda dari suatu penyakit tertentu
              sehingga dapat dilakukan diagnosis dan penanganan secara dini.
            </p>
          </div>
          <section className=" flex justify-between items-center font-bold  py-8">
            <p>Rp 500.000</p>
            <button className="capitalize text-white px-4 font-normal py-1 rounded-2xl bg-blueCustom">Buat janji</button>
          </section>
        </article>
      </article>
      <article className="grid grid-cols-2 container gap-12 items-stretch content-stretch border-b-2 border-blueCustom py-12">
        <figure>
          <Image
            src="https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16828353470227422.webp"
            alt="service"
            width={1000}
            height={1000}
            className="w-max"
          />
        </figure>
        <article className="col-span-1 flex justify-between flex-col text-justify text-lg  ">
          <div className="space-y-4">
            <h2 className="capitalize font-bold text-xl ">
              Test bebas narkoba
            </h2>
            <p className="first-letter:capitalize ">
              prosedur pemeriksaan kesehatan menyeluruh yang dilakukan oleh
              praktisi kesehatan. Medical check-up dapat mendeteksi adanya
              gejala, potensi, dan tanda-tanda dari suatu penyakit tertentu
              sehingga dapat dilakukan diagnosis dan penanganan secara dini.
            </p>
          </div>
          <section className=" flex justify-between items-center font-bold  py-8">
            <p>Rp 500.000</p>
            <button className="capitalize text-white px-4 font-normal py-1 rounded-2xl bg-blueCustom">Buat janji</button>
          </section>
        </article>
      </article>
      <article className="grid grid-cols-2 container gap-12 items-stretch content-stretch border-b-2 border-blueCustom py-12">
        <figure>
          <Image
            src="https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16828353470227422.webp"
            alt="service"
            width={1000}
            height={1000}
            className="w-max"
          />
        </figure>
        <article className="col-span-1 flex justify-between flex-col text-justify text-lg  ">
          <div className="space-y-4">
            <h2 className="capitalize font-bold text-xl ">
              Test bebas narkoba
            </h2>
            <p className="first-letter:capitalize ">
              prosedur pemeriksaan kesehatan menyeluruh yang dilakukan oleh
              praktisi kesehatan. Medical check-up dapat mendeteksi adanya
              gejala, potensi, dan tanda-tanda dari suatu penyakit tertentu
              sehingga dapat dilakukan diagnosis dan penanganan secara dini.
            </p>
          </div>
          <section className=" flex justify-between items-center font-bold  py-8">
            <p>Rp 500.000</p>
            <button className="capitalize text-white px-4 font-normal py-1 rounded-2xl bg-blueCustom">Buat janji</button>
          </section>
        </article>
      </article>
    </section>
  );
};

export default Service;
