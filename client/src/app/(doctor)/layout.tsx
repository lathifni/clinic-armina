import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderDoctor from "@/components/HeaderDoctor";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderDoctor  />
      <main className="bg-blueLigth">{children}</main>
      <Footer />
    </>
  );
}
