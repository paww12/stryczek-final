import { CollectionConfig } from 'payload'

export const HeroDescription: CollectionConfig = {
  slug: 'hero-description',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
}
