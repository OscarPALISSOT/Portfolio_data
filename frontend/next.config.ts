import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend.data.oscarpalissot.fr',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;