import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
