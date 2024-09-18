import React from 'react';

interface ContentSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, imageUrl }) => {
  return (
    <section className="text-left py-8 px-4">
      <img src={imageUrl} alt={title} className="w-full max-w-md mx-auto mb-6 rounded" />
      <h2 className="text-2xl text-center font-semibold mb-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </section>
  );
};

export default ContentSection;
