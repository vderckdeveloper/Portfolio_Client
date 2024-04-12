/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   // Proxy Server. 
   async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "http://localhost:3001/:path*", // Proxy to Backend
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:3001/uploads/:path*", // proxy to internal server for uploads folder
      }
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '30.60.100.255' },
      { protocol: 'https', hostname: '30.60.100.255' },
      { protocol: 'http', hostname: 'seungminportfolio.com' },
      { protocol: 'https', hostname: 'seungminportfolio.com' }
    ], // add remote patterns needed for the image later 
    loader: 'default',
  },
};

export default nextConfig;
