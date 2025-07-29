// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'roles' as const,
      required: true,
      hasMany: false, // One role per user
    },
  ],
}
