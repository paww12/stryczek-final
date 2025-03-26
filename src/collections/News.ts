import { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'subcontent',
      label: 'SubContent',
      type: 'richText',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image2',
      label: 'Image 2',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}
