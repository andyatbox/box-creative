import { columnsContentField } from './columnsContentField'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Branding & Print', value: 'branding-print' },
          { title: 'Interactive Experiences', value: 'immersive-ux' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'videoUrl',
      title: 'Vimeo URL or Embed Code',
      type: 'text',
      rows: 3,
      description: 'Paste a Vimeo URL (https://vimeo.com/123456789) or the full embed code.',
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      description: 'Images displayed in a slider below the main media.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
        { type: 'code' },
      ],
    },
    columnsContentField,
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
    },
    prepare({ title, category, media }) {
      const labels = {
        'branding-print': 'Branding & Print',
        'immersive-ux': 'Interactive Experiences',
      }
      return { title, subtitle: labels[category] || category, media }
    },
  },
}
