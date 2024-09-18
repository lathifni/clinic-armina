import { FC } from "react";
import Image from "next/image";

interface ImageAndTextSectionProps {
  imageUrl: string;
  altText: string;
  content: string;
  reverse?: boolean;  // Option to reverse the layout
}

const ImageAndTextSection: FC<ImageAndTextSectionProps> = ({
  imageUrl,
  altText,
  content,
  reverse ,
}) => {
  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <Image
        src={imageUrl}
        width={1000}
        height={1000}
        className="rounded-3xl w-full h-56 sm:h-72 md:h-80 lg:h-96 bg-blue-300/50"
        alt={altText}
      />
      <p className="text-justify text-sm sm:text-base lg:text-lg">{content}</p>
    </section>
  );
};

export default ImageAndTextSection;
