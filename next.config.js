/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment
  basePath: process.env.GITHUB_PAGES === 'true' ? '/agentforge' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/agentforge/' : '',
  trailingSlash: true,
}

module.exports = nextConfig
