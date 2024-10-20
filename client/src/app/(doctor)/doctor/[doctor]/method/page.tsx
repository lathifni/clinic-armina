'use client'
import { NextPage } from 'next'
import { useState,useEffect } from 'react';
import Tabs from '@/components/method/Tabs';
import ContentSection from '@/components/method/ContentSection';
import VideoSection from '@/components/method/VideoSection';
import ConsultButton from '@/components/method/ConsultButton';
import { useFetchSubLayanan } from '@/features/useFetchSubLayanan';
import { useParams } from 'next/navigation';
import { useFilterData } from '@/features/useFilterData';

interface ContentData {
  nama: string;
  deskripsi: string;
  image: string;
  link_youtube: string
}
interface Props {}

const Method: NextPage<Props> = ({}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const {data, isLoading,isError} = useFetchSubLayanan()
    const id= useParams().doctor.toString() 
    const filteredData = useFilterData(data?.data,id)
    const tabs: string[] = filteredData?.map((item:any)=>item.nama);
    
    const contentData: ContentData[] = filteredData
 
  console.log()
  const RenderContent =( )=>{
    return filteredData &&    <ContentSection
    nama={contentData[activeTab].nama}
    deskripsi={contentData[activeTab].deskripsi}
    image={contentData[activeTab].image}
  />
  }
  return (
    <section className="container max-w-5xl py-16">
    <Tabs tabs={tabs} onTabClick={setActiveTab} />
    <RenderContent />
    <ConsultButton />
    {contentData&& <VideoSection videoUrl={contentData[activeTab].link_youtube} nama="Video sunat gigi!" /> }
  </section>
  )
}

export default Method