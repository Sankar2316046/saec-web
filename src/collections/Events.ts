// src/collections/Events.ts
import type { CollectionConfig } from 'payload';

const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'eventName',
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Seminar', value: 'seminar' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Webinar', value: 'webinar' },
      ],
      required: true,
    },
    {
      name: 'eventName',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDateTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          timeIntervals: 15,
        }
      },
      required: true,
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'verifiers',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'relationship',
          relationTo: 'roles', // Reference to the roles collection
          required: true,
        },
        {
            name: 'verified',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              hidden: true,
            },
          }
          
      ],
    },
  ],
  timestamps: true,
};

export default Events;