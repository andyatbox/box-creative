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
          { title: 'Advertising Rich Media', value: 'advertising-rich-media' },
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
      name: 'gallery',
      title: 'Gallery',
      description: 'Images and videos displayed in a slider below the main media.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imagesSlide',
          title: 'Images',
          fields: [
            {
              name: 'images',
              title: 'Images',
              description: 'Drop or select several images at once. Each one becomes its own slide.',
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
              options: { layout: 'grid' },
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: { images: 'images', media: 'images.0' },
            prepare({ images, media }) {
              const count = images?.length || 0
              return {
                title: count === 1 ? '1 image' : `${count} images`,
                media,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'videoSlide',
          title: 'Video',
          fields: [
            {
              name: 'videoUrl',
              title: 'Video URL or Embed Code',
              type: 'text',
              rows: 3,
              description:
                'Paste a Vimeo URL (https://vimeo.com/123456789), a Gumlet URL (https://play.gumlet.io/embed/ASSET_ID), or the full embed code from either.',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { videoUrl: 'videoUrl' },
            prepare({ videoUrl }) {
              return { title: 'Video', subtitle: videoUrl }
            },
          },
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
        'advertising-rich-media': 'Advertising Rich Media',
      }
      return { title, subtitle: labels[category] || category, media }
    },
  },
}
