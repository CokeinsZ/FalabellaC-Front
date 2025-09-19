import type { NextConfig } from "next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // acepta todos los hosts
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;