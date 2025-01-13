/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dev.eventeam.online" },
      { protocol: "https", hostname: "eventeam.xtremecoderz.com" },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
      },
    ],
  },
  crossOrigin: "anonymous",

};

export default nextConfig;
