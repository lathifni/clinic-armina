import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { linkDoctor } from "@/data/link/linkDoctor"; 

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header links={linkDoctor} />
      <main className="bg-blueLigth">{children}</main>
      <Footer />
    </>
  );
}
