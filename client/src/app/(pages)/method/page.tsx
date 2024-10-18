'use client'
import { NextPage } from 'next'
import { useState } from 'react';
import Tabs from '@/components/method/Tabs';
import ContentSection from '@/components/method/ContentSection';
import VideoSection from '@/components/method/VideoSection';
import ConsultButton from '@/components/method/ConsultButton';

interface ContentData {
  title: string;
  description: string;
  imageUrl: string;
}
interface Props {}

const Method: NextPage<Props> = ({}) => {
    const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: string[] = ['Stapler', 'konvensional', 'Klamp', 'Lem'];

  const contentData: ContentData[] = [
    {
      title: 'SUNAT STAPLER',
      description: `Lorem ipsum dolor sit amet consectetur. Faucibus morbi in nunc. Eget nunc mauris eros odio vitae. 
      Eu amet eget dignissim tincidunt. Commodo sodales eleifend lorem mauris venenatis urna cursus.`,
      imageUrl: 'https://sunat123.com/media/k2/items/cache/75b44b0e9c2e5d305fa323c6c51d3476_XL.jpg', // Update with your image
    },
    {
      title: 'SUNAT KONVENSIONAL',
      description: `Lorem ipsum dolor sit amet consectetur. Faucibus morbi in nunc.`,
      imageUrl: 'https://sunatpenak.com/wp-content/uploads/2022/03/sunat-konven.png',
    },
    {
      title: 'SUNAT KLAMP',
      description: `Lorem ipsum dolor sit amet consectetur.`,
      imageUrl: 'https://sunatummi.com/wp-content/uploads/2023/03/Sunat-Klem-Ummi.png',
    },
    {
      title: 'SUNAT LEM',
      description: `Lorem ipsum dolor sit amet consectetur. Faucibus morbi in nunc.`,
      imageUrl: 'https://img.ws.mms.shopee.co.id/8502803413934eb835bbc200b4426e4d',
    },
  ];

  const videoUrls: string[] = [
    'https://www.youtube.com/embed/video-1',
    'https://www.youtube.com/embed/video-2',
    'https://www.youtube.com/embed/video-3',
    'https://www.youtube.com/embed/video-4',
  ];
  return (
    <section className="container max-w-5xl py-16">
    <Tabs tabs={tabs} onTabClick={setActiveTab} />
    <ContentSection
      title={contentData[activeTab].title}
      description={contentData[activeTab].description}
      imageUrl={contentData[activeTab].imageUrl}
    />
    <ConsultButton />
    <VideoSection videoUrl={videoUrls[activeTab]} title="Video sunat gigi!" />
  </section>
  )
}

export default Method