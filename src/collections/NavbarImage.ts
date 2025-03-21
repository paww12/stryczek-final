import { CollectionConfig } from 'payload'

export const NavbarImage: CollectionConfig = {
  slug: 'navbar-image',
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
  ],
}
