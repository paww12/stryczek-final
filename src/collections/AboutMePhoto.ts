import { CollectionConfig } from 'payload'

export const AboutMePhoto: CollectionConfig = {
  slug: 'about-me-photo',
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
