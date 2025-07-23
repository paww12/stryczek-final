import { CollectionConfig } from 'payload'

export const NavbarText: CollectionConfig = {
  slug: 'navbar-text',
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
