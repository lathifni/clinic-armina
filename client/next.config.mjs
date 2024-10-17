/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'klinikmatapandaan.com',
      },
      {
        protocol: 'https',
        hostname: 'd1vbn70lmn1nqe.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.its.ac.id',
      },
      {
        protocol: 'https',
        hostname: 'mysiloam-api.siloamhospitals.com',
      },
      {
        protocol: 'https',
        hostname: 'arminaskincare.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jurnalbengkulu.com',
      },
      {
        protocol: 'http', 
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
