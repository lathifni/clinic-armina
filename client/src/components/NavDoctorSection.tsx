// components/Header.tsx
"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { linkDoctor } from "@/data/link/linkDoctor";
import { useFetchSubLayanan } from "@/features/useFetchSubLayanan";
import { useFilterData } from "@/features/useFilterData";
type NavProps = {
  label: string;
  href: string;
};

export default function NavDoctorSection({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();
  const path = pathname.split("/").slice(1, 3).join("/");
  const { data } = useFetchSubLayanan();
  const id = useParams().doctor.toString();
  const filteredData = useFilterData(data?.data, id);
  const checkLinkYt = filteredData?.every(
    (data: any) => data.link_youtube === null
  );

  const links = linkDoctor(path);
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
    <header className="shadow-md bg-white z-30 sticky top-0 w-full h-auto px-4 sm:px-10 md:px-20 lg:px-40 py-2 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <Link href="/" className="text-center sm:text-left">
        <h1 className="text-[#0766AD] font-bold text-2xl sm:text-3xl lg:text-4xl">
          Armina
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-thin font-serif">
          Klinik
        </h2>
      </Link>
      <nav className="md:flex hidden flex-col sm:flex-row text-sm space-y-2 sm:space-y-0 sm:space-x-8 capitalize">
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
      </nav>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        onClick={onClick}
        className="md:hidden  inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg   transition-ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </header>
  );
}
