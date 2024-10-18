 import React from "react";
import {MainSection} from "@/components/home/MainSection";
import PromoSection from "@/components/home/PromoSection";
import QuoteSection from "@/components/home/QuoteSection";
import ServiceSection from "@/components/home/ServiceSection";
import { useFetchLayanan } from "@/features/useFetchLayanan";

export default function Home() { 
  return (
    <div>
      <main className="text-white">
        <MainSection />
        <PromoSection />
        <QuoteSection />
        <ServiceSection/>
      </main>
      
    </div>
  );
}
