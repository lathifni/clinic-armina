import { baseUrl } from '@/lib/baseUrl';
import Image from 'next/image';
import React from 'react';

interface ContentSectionProps {
  nama: string;
  deskripsi: string;
  image: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ nama, deskripsi, image }) => {
  return (
    <section className="text-left py-8 px-4">
      <Image src={baseUrl+image} width={1000} height={1000} alt={nama} className="w-full max-w-md mx-auto mb-6 rounded" />
      <h2 className="text-2xl text-center font-semibold mb-4">{nama}</h2>
      <p className="text-gray-600">{deskripsi}</p>
    </section>
  );
};

export default ContentSection;
