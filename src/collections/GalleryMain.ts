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
      // hooks: {
      //   afterRead: [
      //     ({ value }) => {
      //       if (value && typeof value === 'object') {
      //         return value.title
      //       }
      //       return value
      //     },
      //   ],
      // },
    },
  ],
}
