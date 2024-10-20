// components/Header.tsx
"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname ,useParams } from "next/navigation";
import { linkDoctor } from "@/data/link/linkDoctor";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan"; 
import { useFilterData } from "@/features/useFilterData";
type NavProps = {
    label: string;
    href: string;
};

export default function HeaderDoctor() {
  const pathname = usePathname();
  const path = pathname.split('/').slice(1,3).join('/');
  const {data} = useFetchSubLayanan()
  const id= useParams().doctor.toString() 
   const filteredData = useFilterData(data?.data,id)
   const checkLinkYt = filteredData?.every((data:any)=>data.link_youtube===null)
 
  const links = linkDoctor(path) 
  const RenderLink = () => {
    return links.map((link: NavProps) => (
      <Link
        href={link.href}
        key={link.label}
        className={clsx(
          "hover:text-blue-800 ",
          pathname === link.href && "text-blue-600"
        )}
      >
        {" "}
        {link.label}
      </Link>
    ));
  };

  return (
    <header className="shadow-md bg-white z-50 sticky top-0 w-full h-auto px-4 sm:px-10 md:px-20 lg:px-40 py-2 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <Link href="/" className="text-center sm:text-left">
        <h1 className="text-[#0766AD] font-bold text-2xl sm:text-3xl lg:text-4xl">
          Armina
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-thin font-serif">
          Klinik
        </h2>
      </Link>
      <nav className="flex flex-col sm:flex-row text-sm space-y-2 sm:space-y-0 sm:space-x-8 capitalize">
        <RenderLink />
        {
          !checkLinkYt&&(     <Link
          href={"/"+path+"/method"} 
          className={clsx(
            "hover:text-blue-800 ",
            pathname ==="/"+path+"/method" && "text-blue-600"
          )}
        >
          Method
        </Link>)
        }
      </nav>
    </header>
  );
}
