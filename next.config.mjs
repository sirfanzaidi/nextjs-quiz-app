import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public", // Destination folder for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the service worker
  skipWaiting: true, // Skip waiting for the service worker to activate
  ...nextConfig, // Merge with the existing Next.js config
});