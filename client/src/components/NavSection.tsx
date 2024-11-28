// components/Header.tsx
"use client";

import { links } from "@/data/link/links";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavProps = {
  label: string;
  href: string;
};

export default function NavSection({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();
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
