import { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['Desery', 'Wypieki', 'Ciasta'],
      required: true,
    },
    {
      name: 'allergens',
      type: 'array',
      fields: [
        {
          name: 'allergen',
          type: 'text',
        },
      ],
    },
    {
      name: 'prices',
      type: 'group',
      fields: [
        {
          name: 'full',
          type: 'number',
          label: 'Pełna porcja',
          min: 0,
        },
        {
          name: 'half',
          type: 'number',
          label: 'Pół porcji',
          min: 0,
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
  ],
}
