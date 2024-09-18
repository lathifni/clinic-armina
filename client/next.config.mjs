/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['klinikmatapandaan.com','d1vbn70lmn1nqe.cloudfront.net',"www.its.ac.id",'mysiloam-api.siloamhospitals.com','arminaskincare.com','www.jurnalbengkulu.com'], // Add the allowed image domains here
    },
};

export default nextConfig;
