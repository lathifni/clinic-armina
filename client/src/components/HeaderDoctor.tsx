// components/Header.tsx
"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname ,useParams } from "next/navigation";
import { linkDoctor } from "@/data/link/linkDoctor";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan"; 
import { useFilterData } from "@/features/useFilterData";
import NavDoctorSection from "./NavDoctorSection";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
type NavProps = {
    label: string;
    href: string;
};

export default function HeaderDoctor() {
  const [open, setOpen] = useState(false);

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
  const toggleHumberger = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
    <NavDoctorSection onClick={() => toggleHumberger()} />
    <div
      onClick={() => toggleHumberger()}
      className={`inset-0 z-40 ${
        open ? "block" : "hidden"
      } bg-black/50 fixed`}
    />

    <nav
      className={`${
        open ? "translate-x-0" : "translate-x-full"
      } z-50   h-full  transition-ease-in-out  bg-[#fffaff] shadow-sm fixed min-w-[300px] top-0 right-0 p-4`}
    >
      <div
        className={` space-y-4  justify-end items-end transition-ease-in-out flex flex-col`}
        id="navbar-default"
      >
        <FaX onClick={() => toggleHumberger()} />
        <RenderLink />
        {!checkLinkYt && (
          <Link
            href={"/" + path + "/method"}
            className={clsx(
              "hover:text-blue-800 ",
              pathname === "/" + path + "/method" && "text-blue-600"
            )}
          >
            Method
          </Link>
        )}
      </div>
    </nav>
  </>
  );
}
