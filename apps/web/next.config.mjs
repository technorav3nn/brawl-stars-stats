import createBundleAnalyzerPlugin from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzerPlugin({
    enabled: process.env.ANALYZE === "true",
});
/* eslint-disable sort-keys-fix/sort-keys-fix */
/** @type {import('next').NextConfig} */
const userConfig = {
    experimental: {
        appDir: true,
        turbo: {
            resolveAlias: {
                "~/styled-system": "./styled-system",
            },
        },
        serverActions: true,
        instrumentationHook: true,
    },
    modularizeImports: {
        "@tabler/icons-react": {
            transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
        },
        "@mantine/core": {
            transform: "@mantine/core",
            skipDefaultConversion: true,
        },
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                // https:/cdn-old.brawlify.com
                protocol: "https",
                hostname: "cdn-old.brawlify.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

const nextConfig = withBundleAnalyzer(userConfig);

export default nextConfig;
