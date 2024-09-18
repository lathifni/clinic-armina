// components/ServiceSection.tsx
export default function ServiceSection() {
  return (
    <section className="text-[#333333] text-center text-[32px] sm:text-[36px] lg:text-[44px] px-4 sm:px-16 lg:px-20 py-12 sm:py-16 lg:py-20 space-y-10">
      <strong>Layanan Kami</strong>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="rounded-2xl shadow-md shadow-cyan-700 p-4 sm:p-8 bg-blueCustom">
          <img
            className="max-w-full h-auto"
            src="/path/to/layanan1.jpg"
            alt="img layanan 1"
          />
        </div>
        <div className="rounded-2xl shadow-md shadow-cyan-700 p-4 sm:p-8 bg-blueCustom">
          <img
            className="max-w-full h-auto"
            src="/path/to/layanan2.jpg"
            alt="img layanan 2"
          />
        </div>
        <div className="rounded-2xl shadow-md shadow-cyan-700 p-4 sm:p-8 bg-blueCustom">
          <img
            className="max-w-full h-auto"
            src="/path/to/layanan3.jpg"
            alt="img layanan 3"
          />
        </div>
      </div>
    </section>
  );
}
