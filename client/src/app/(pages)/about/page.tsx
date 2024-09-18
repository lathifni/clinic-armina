import { NextPage } from "next";
import SectionHeader from "@/components/about/SectionHeader";
import ImageAndTextSection from "@/components/about/ImageAndTextSection";
import VisionMission from "@/components/about/VisionMission";
import OrganizationStructure from "@/components/about/OrganizationStructure";
import ContentWrapper from "@/components/about/ContentWrapper";

const AboutUs: NextPage = () => {
  const vision = [
    "Klinik Armina medika bertekad untuk meningkatkan profesionalitas dalam memberikan pelayanan kesehatan dalam era persaingan bebas.",
    "Menjadikan klinik Armina medika menjadi klinik keluarga dan memberikan pelayanan yang terbaik kepada pasien sehingga pasien tersebut cepat di berikan kesembuhan."
  ];

  const mission = [
    "Memberikan pelayanan kesehatan kepada pasien umum, pasien asuransi kesehatan dan bagi tenaga kerja perusahaan yang meliputi pelayanan, peningkatan dan penyembuhan penyakit guna menjaga dan meningkatkan kesehatan masyarakat dan tenaga kerja perusahaan agar bisa tetap produktif yang berkualitas.",
    "Menciptakan lingkungan kerja yang sehat dan harmonis."
  ];

  return (
    <ContentWrapper>
      <SectionHeader title="Profil" />
      <ImageAndTextSection
        imageUrl="https://arminaskincare.com/wp-content/uploads/2019/03/cabang-armina-1.jpg"
        altText="profil image"
        content="Lorem ipsum dolor sit amet consectetur..."
      />

      <VisionMission vision={vision} mission={mission} />

      <SectionHeader title="Sejarah" />
      <ImageAndTextSection
        imageUrl="https://www.jurnalbengkulu.com/sites/default/files/article/2019/06/KLINIK.jpeg"
        altText="sejarah image"
        content="Lorem ipsum dolor sit amet consectetur..."
        reverse ={true}
      />

      <OrganizationStructure />
    </ContentWrapper>
  );
};

export default AboutUs;
