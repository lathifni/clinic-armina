import { FC, ReactNode } from "react";

type ContentWrapperProps= {
  children: ReactNode;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children }) => {
  return <section className="container pb-16 px-4 sm:px-6 md:px-12 lg:px-20 py-16 space-y-8">{children}</section>;
};

export default ContentWrapper;
