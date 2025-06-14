import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: true
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
