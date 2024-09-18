import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { links } from "@/data/link/links";
import { Metadata } from "next";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header links={links} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
