// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Logo } from './collections/Logo'
import { NavbarImage } from './collections/NavbarImage'
import { NavbarText } from './collections/NavbarText'
import { HeroDescription } from './collections/HeroDescription'
import { News } from './collections/News'
import { AboutMePhoto } from './collections/AboutMePhoto'
import { Opinion } from './collections/Opinion'
import { emailAdapter } from './adapters/email'
import { testAPI } from './adapters/APIhandlers'
import { Product } from './collections/Product'
import GalleryTop from './collections/GalleryTop'
import { GalleryMain } from './collections/GalleryMain'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  endpoints: [testAPI],
  email: emailAdapter,
  routes: {
    admin: '/dupa',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.ico',
        },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Logo,
    NavbarImage,
    NavbarText,
    HeroDescription,
    News,
    AboutMePhoto,
    Opinion,
    Product,
    GalleryTop,
    GalleryMain,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI_DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
