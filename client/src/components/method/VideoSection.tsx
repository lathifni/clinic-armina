import React from 'react';

interface VideoSectionProps {
  videoUrl: string;
  nama: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl, nama }) => {
  return (
    <section className="py-8 text-center">
      <h3 className="text-xl font-medium mb-4">{nama}</h3>
      <div className="w-full max-w-lg mx-auto">
      <iframe width="560" height="315" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </section>
  );
};
 
export default VideoSection;
