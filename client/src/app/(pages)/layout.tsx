import React, { Suspense } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { links } from "@/data/link/links"; 

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header   />
      <Suspense fallback={<p>loading...</p>}>
      <main className="bg-blueLigth">{children}</main>
      </Suspense>
      <Footer />
    </>
  );
}
