import { columnsContentField } from './columnsContentField'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'page' }),
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
      description: 'The URL path, e.g. "about" → /about',
    },
    {
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Label shown in the menu. Defaults to the page title if blank.',
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
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
    },
    columnsContentField,
  ],
}
