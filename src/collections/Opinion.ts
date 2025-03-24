import { CollectionConfig } from 'payload'

export const Opinion: CollectionConfig = {
  slug: 'opinion',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'opinion',
      label: 'Opinion',
      type: 'text',
      required: true,
    },
    {
      name: 'stars',
      label: 'Stars',
      type: 'number',
      required: true,
    },
  ],
}
