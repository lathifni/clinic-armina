// components/Header.tsx
"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavProps = {
  links: Array<{
    label: string;
    href: string;
  }>;
};

export default function Header({ links }: NavProps) {
  const pathname = usePathname();
  
  return (
    <header className="shadow-md bg-white h-auto px-4 sm:px-10 md:px-20 lg:px-40 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <Link href="/home" className="text-center sm:text-left">
        <h1 className="text-[#0766AD] font-bold text-2xl sm:text-3xl lg:text-4xl">
          Armina
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-thin font-serif">
          Klinik
        </h2>
      </Link>
      <nav className="flex flex-col sm:flex-row text-sm space-y-2 sm:space-y-0 sm:space-x-8 capitalize">
        {links.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.label}
              className={clsx("hover:text-blue-800 ", (pathname===link.href)&&'text-blue-600')}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
