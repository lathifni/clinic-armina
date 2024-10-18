type ServiceProps = {
    nama: string; 
    deskripsi: string;
    harga: number
}
export const ServiceDetail= ({nama,deskripsi,harga}:ServiceProps)=>{
    return <article className="col-span-1  flex justify-between flex-col text-justify text-lg  ">
    <div className="space-y-4">
      <h2 className="capitalize font-bold text-xl ">
        {nama}
      </h2>
      <p className="first-letter:capitalize ">
     {deskripsi}
      </p>
    </div>
    <section className="space-y-1 flex flex-col md:flex-row justify-between items-center font-bold  py-8">
      <p className="max-md:border-y-2 max-md:w-full text-center md:text-left">{harga}</p>
      <button className="capitalize text-white px-4 font-normal py-1 w-full rounded md:w-fit md:rounded-2xl bg-blueCustom">Buat janji</button>
    </section>
  </article>
}