/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // @todo - temp, remove later.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // @todo - temp, remove later.
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
