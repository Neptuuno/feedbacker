/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "172.17.0.1",
                port: "3000",
            }
        ]
    }
};

export default nextConfig;
