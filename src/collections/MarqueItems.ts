import { CollectionConfig } from 'payload'

export const MarqueItems: CollectionConfig = {
  slug: 'marque-item',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'product',
    },
  ],
}
