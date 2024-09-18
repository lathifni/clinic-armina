import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Gallery: NextPage<Props> = ({}) => {
  return (
    <section className="container py-16">
      <section className="rounded-3xl text-5xl text-center bg-blueLigth shadow-[2px_2px_16px_1px_#0766AD] space-y-12 p-8">
        <h2 className="mx-auto w-fit p-8 border-b border-[#0766AD]"> Galeri</h2>

        <article className="grid grid-cols-3 justify-items-center gap-8   ">
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="rounded "
          />
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="rounded "
          />
          <Image
            src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg"
            alt="galery"
            height={1500}
            width={1500}
            className="rounded "
          />
        </article>
        <h2 className="mx-auto w-fit px-8 border-t h-0 overflow-hidden border-[#0766AD] text-transparent">
          Galeri
        </h2>

        <p className="text-base text-right text-blueCustom font-serif">
          selengkapnya &gt; &gt;{" "}
        </p>
      </section>
    </section>
  );
};

export default Gallery;
