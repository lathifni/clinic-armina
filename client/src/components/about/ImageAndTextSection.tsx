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
      className={`flex flex-col justify-center items-center lg:items-start lg:flex-row gap-8 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <Image
        src={imageUrl}
        width={1000}
        height={1000}
        className="rounded-3xl aspect-square bg-contain h-auto w-1/2 sm:h-auto md:h-autp lg:h-auto bg-blue-300/50"
        alt={altText}
      />
      <p className="text-justify grow basis-1/2  text-sm sm:text-base lg:text-lg">{content}</p>
    </section>
  );
};

export default ImageAndTextSection;
