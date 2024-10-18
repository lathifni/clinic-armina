'use client'
import { useFetchFaq } from '@/features/useFetchFaq';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface AccordionItemProps {
  question: string;
  answer: string;
}

type FaqSchema = {
  id: number;
  pertanyaan: string;
  jawaban: string;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-linear ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="px-4 pb-4 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const AccordionFaq: React.FC = () => {
const {data,isLoading,isError} = useFetchFaq()

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (data?.data?.map((item:FaqSchema) => (
        <AccordionItem key={item.id} question={item.pertanyaan} answer={item.jawaban} />
      ))
   
  );
};

export default AccordionFaq;
