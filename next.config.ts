import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://tailus.io/**'),
      new URL('https://images.unsplash.com/**'),
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/u/**/*' },
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
};

export default nextConfig;
