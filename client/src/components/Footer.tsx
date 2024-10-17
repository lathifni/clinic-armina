import Image from "next/image";
import fb from "@/assets/fb.svg";
import wa from "@/assets/wa.svg";
import ig from "@/assets/ig.svg";
import tiktok from "@/assets/tiktok.svg";
import ContactForm from "@/components/home/ContactForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blueCustom text-white">
      <div className="container mx-auto px-4 py-8 space-y-8 md:grid md:grid-cols-2 md:gap-8">
        <section className="space-y-8">
          <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}assets/images/sunat/1728355639267.png`}
              width={1000}
              height={1000}
              className="w-24 h-24 bg-slate-100 rounded-full"
              alt="icon footer"
            />
            <h2 className="text-3xl md:text-5xl font-extrabold text-center md:text-left">
              Klinik Armina
            </h2>
          </div>
          <section className="text-center md:text-left space-y-4">
            <p className="text-sm md:text-xl">
              Jalan Raya Naggalo, KP. Olo, Kec. Naggalo, Kota Padang, Sumatera Barat 25 173
            </p>
            <p className="text-sm md:text-xl">Telp: 081282906090</p>
          </section>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.73706202765!2d102.29540607450275!3d-3.7766412434184593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e36b116d4539a2b%3A0x94f124daaa8988f3!2sKLINIK%20PRATAMA%20ARMINA%20SAKTI!5e1!3m2!1sen!2sid!4v1726462783308!5m2!1sen!2sid"
            className="w-full h-64 md:h-80 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <section className="space-y-8 text-center md:text-left">
          <section className="grid grid-cols-2 gap-4 md:grid-cols-2 text-sm md:text-xl">
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <Image width={40} height={40} src={fb.src} alt="Facebook" />
              <p>Facebook</p>
            </div>
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <Image width={40} height={40} src={tiktok.src} alt="TikTok" />
              <p>Tiktok</p>
            </div>
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <Image width={40} height={40} src={wa.src} alt="WhatsApp" />
              <p>WhatsApp</p>
            </div>
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <Image width={40} height={40} src={ig.src} alt="Instagram" />
              <p>Instagram</p>
            </div>
          </section>
          <section>
            <ContactForm />
          </section>
        </section>
      </div>

      <section className="bg-black text-white text-center py-4">
        <h1>&copy; {currentYear} Lea Family.</h1>
      </section>
    </footer>
  );
}
