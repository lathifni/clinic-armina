import React from "react";
import MainSection from "@/components/Home/MainSection";
import PromoSection from "@/components/Home/PromoSection";
import QuoteSection from "@/components/Home/QuoteSection";
import ServiceSection from "@/components/Home/ServiceSection";

export default function Home() {
  return (
    <div>
      <main className="text-white">
        <MainSection />
        <PromoSection />
        <QuoteSection />
        <ServiceSection />
      </main>
      
    </div>
  );
}
