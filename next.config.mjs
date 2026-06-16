/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow next/image to serve images uploaded to Vercel Blob (back office).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
