import { FC } from "react";

interface VisionListProps {
  data: string[];
  title:string;
  number:boolean;
}

const VisionList: FC<VisionListProps> = ({ data,title,number }) => {
  return (
    <article className="space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 text-center font-bold">
        {title}
      </h1>
      <ul className={`${number?'list-decimal':'list-none'}  px-6 text-sm sm:text-base lg:text-lg text-justify`}>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

export default VisionList;
