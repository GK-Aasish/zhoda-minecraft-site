/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "media.forgecdn.net" },
      { protocol: "https", hostname: "optifine.net" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" }
    ]
  }
};
module.exports = nextConfig;
