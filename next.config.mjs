import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  output: 'standalone',
  // Your Next.js config here
  output: 'standalone',
=======
  output: 'standalone'
>>>>>>> tests
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
