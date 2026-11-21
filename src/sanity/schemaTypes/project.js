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
    // Cross-cutting craft, not the one bucket a project lives in: `category`
    // stays single-choice because it decides which portfolio a project
    // appears in, while a project can be any number of these at once. The
    // values are what gets stored, so they are slugs rather than the labels
    // — renaming a label later is then a change here alone.
    {
      name: 'tags',
      title: 'Tags',
      description: 'What the work involved. Tick every one that applies.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Activation', value: 'activation' },
          { title: 'App Development', value: 'app-development' },
          { title: 'Artificial Intelligence', value: 'artificial-intelligence' },
          { title: 'Augmented Reality', value: 'augmented-reality' },
          { title: 'Brand Identity & Logo', value: 'brand-identity-logo' },
          { title: 'CGI / 3D Design', value: 'cgi-3d-design' },
          { title: 'Copywriting', value: 'copywriting' },
          { title: 'Illustration', value: 'illustration' },
          { title: 'Immersive Experience', value: 'immersive-experience' },
          { title: 'Store Design', value: 'store-design' },
          { title: 'Marketing Strategy', value: 'marketing-strategy' },
          { title: 'Motion & Animation', value: 'motion-animation' },
          { title: 'Print & Packaging', value: 'print-packaging' },
          { title: 'Product Design', value: 'product-design' },
          { title: 'Rich Media Ads', value: 'rich-media-ads' },
          { title: 'Web Design & UX', value: 'web-design-ux' },
        ],
        // Checkboxes rather than a tag picker: the list is fixed and short
        // enough to read at a glance, and seeing the unticked ones is half
        // the point.
        layout: 'grid',
      },
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
            // Only `images` is selected: adding a second path under the same
            // head (`images.0`) makes Sanity resolve the array as an object,
            // which loses both the length and the first item.
            select: { images: 'images' },
            prepare({ images }) {
              const count = images?.length || 0
              return {
                title: count === 1 ? '1 image' : `${count} images`,
                media: images?.[0],
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
