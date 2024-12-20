'use client'
import { NextPage } from "next";
import SectionHeader from "@/components/about/SectionHeader";
import ImageAndTextSection from "@/components/about/ImageAndTextSection";
import VisionMission from "@/components/about/VisionMission";
import OrganizationStructure from "@/components/about/OrganizationStructure";
import ContentWrapper from "@/components/about/ContentWrapper";
import { useFetchAbout } from "@/features/useFetchAbout";
import { baseUrl } from "@/lib/baseUrl";
import { DataNotAvailable } from "@/components/common/DataNotAvailable";
import Loading from "@/components/common/Loading";

type AboutSchema = {
  id: string;
  title: string;
  description: string;
  image: string;
}

const AboutUs: NextPage = () => {
  const vision = [
    "Klinik Armina medika bertekad untuk meningkatkan profesionalitas dalam memberikan pelayanan kesehatan dalam era persaingan bebas.",
    "Menjadikan klinik Armina medika menjadi klinik keluarga dan memberikan pelayanan yang terbaik kepada pasien sehingga pasien tersebut cepat di berikan kesembuhan."
  ];

  const mission = [
    "Memberikan pelayanan kesehatan kepada pasien umum, pasien asuransi kesehatan dan bagi tenaga kerja perusahaan yang meliputi pelayanan, peningkatan dan penyembuhan penyakit guna menjaga dan meningkatkan kesehatan masyarakat dan tenaga kerja perusahaan agar bisa tetap produktif yang berkualitas.",
    "Menciptakan lingkungan kerja yang sehat dan harmonis."
  ];

  const { data, isLoading ,isError} = useFetchAbout();

  const RenderAbout: NextPage = () => {
    return (
      <>
        {data?.data?.map((aboutItem: AboutSchema , index:number) => (
          <div className="space-y-8 mb-8" key={aboutItem.id}>
            <SectionHeader title={aboutItem.title} />
            <ImageAndTextSection
              imageUrl={ `${baseUrl}${aboutItem.image}`}
              altText="profil image"
              content={aboutItem.description}
              reverse= {index%2===1}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <ContentWrapper>
      <VisionMission vision={vision} mission={mission} />
      {!isError?!isLoading && data ? <RenderAbout /> : <Loading/>: <DataNotAvailable/>}  
      <OrganizationStructure />
    </ContentWrapper>
  );
};

export default AboutUs;
