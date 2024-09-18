import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Facility: NextPage<Props> = ({}) => {
  return (
    <section className="py-12">
      <header className="text-4xl font-bold text-center py-12">
        <h2>Fasilitas</h2>
      </header>
      <section className="container space-y-12">
        <article className="flex even:flex-row-reverse rounded-3xl border-4 border-lightGreen shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-8 gap-8 bg-blueLigth">
          <div className="col-span-3 grow overflow-hidden rounded-lg ">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-full   bg-blueLigth"
            />
          </div>
          <div className="space-y-8 col-span-2 text-justify">
            <h3 className="font-bold text-2xl capitalize">Tempat parkir</h3>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              nonummy nibh ante, pellentesque a ipsum ac, mattis tincidunt
              justo.
            </p>
          </div>
        </article>
        <article className="flex even:flex-row-reverse rounded-3xl border-4 border-lightGreen shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-8 gap-8 bg-blueLigth">
          <div className="col-span-3 grow overflow-hidden rounded-lg ">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-full   bg-blueLigth"
            />
          </div>
          <div className="space-y-8 col-span-2 text-justify">
            <h3 className="font-bold text-2xl capitalize">Tempat parkir</h3>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              nonummy nibh ante, pellentesque a ipsum ac, mattis tincidunt
              justo.
            </p>
          </div>
        </article>
        <article className="flex even:flex-row-reverse rounded-3xl border-4 border-lightGreen shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-8 gap-8 bg-blueLigth">
          <div className="col-span-3 grow overflow-hidden rounded-lg ">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-full   bg-blueLigth"
            />
          </div>
          <div className="space-y-8 col-span-2 text-justify">
            <h3 className="font-bold text-2xl capitalize">Tempat parkir</h3>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              nonummy nibh ante, pellentesque a ipsum ac, mattis tincidunt
              justo.
            </p>
          </div>
        </article>
        <article className="flex even:flex-row-reverse rounded-3xl border-4 border-lightGreen shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-8 gap-8 bg-blueLigth">
          <div className="col-span-3 grow overflow-hidden rounded-lg ">
            <Image
              src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/09/06081600/Dokter-Umum.jpg.webp"
              alt="medical"
              height={1000}
              width={1000}
              className="w-full   bg-blueLigth"
            />
          </div>
          <div className="space-y-8 col-span-2 text-justify">
            <h3 className="font-bold text-2xl capitalize">Tempat parkir</h3>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              nonummy nibh ante, pellentesque a ipsum ac, mattis tincidunt
              justo.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default Facility;
