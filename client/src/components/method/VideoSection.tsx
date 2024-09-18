import React from 'react';

interface VideoSectionProps {
  videoUrl: string;
  title: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl, title }) => {
  return (
    <section className="py-8 text-center">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <div className="w-full max-w-lg mx-auto">
        <iframe
          width="100%"
          height="315"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
