/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

module.exports = nextConfig
