import 'dotenv/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { NavbarImage } from './collections/NavbarImage'
import { NavbarText } from './collections/NavbarText'
import { HeroDescription } from './collections/HeroDescription'
import { News } from './collections/News'
import { emailAdapter } from './adapters/email'
import { testAPI } from './adapters/APIhandlers'
import { Product } from './collections/Product'
import GalleryTop from './collections/GalleryTop'
import { GalleryMain } from './collections/GalleryMain'
import { MarqueItems } from './collections/MarqueItems'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  endpoints: [testAPI],
  email: emailAdapter,
  routes: {
    admin: '/adminSite',
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
    NavbarImage,
    NavbarText,
    HeroDescription,
    News,
    Product,
    GalleryTop,
    GalleryMain,
    MarqueItems,
    Categories
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
  ],
})
