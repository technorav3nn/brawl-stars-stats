const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        scrollRestoration: true,
    },

    images: {
        domains: ["cdn-old.brawlify.com"],
    },
    reactStrictMode: false,
});
