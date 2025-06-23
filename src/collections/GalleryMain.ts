import { CollectionConfig } from 'payload'

export const GalleryMain: CollectionConfig = {
  slug: 'gallery-main',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'product',
    },
  ],
}
