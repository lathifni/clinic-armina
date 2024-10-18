import AccordionFaq from "@/components/faq/AccordionFaq";
import { NextPage } from "next";

interface Props {}

const Faqs: NextPage<Props> = ({}) => {
  return (
    <section className="max-w-5xl mx-auto py-16 space-y-4">
      <header className="border-b font-bold text-2xl">
        <h2>FAQs</h2>
      </header>
      <section className="space-y-2 ">
        <AccordionFaq />
      </section>
    </section>
  );
};

export default Faqs;
