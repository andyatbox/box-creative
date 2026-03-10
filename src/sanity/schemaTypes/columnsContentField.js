const columnBody = (name, title) => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
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
  ],
})

export const columnsContentField = {
  name: 'columnsContent',
  title: 'Columns Content',
  description: 'Add multi-column content sections.',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'columnGroup',
      title: 'Column Group',
      fields: [
        {
          name: 'columns',
          title: 'Number of Columns',
          type: 'string',
          options: {
            list: [
              { title: '2 Columns', value: '2' },
              { title: '3 Columns', value: '3' },
            ],
            layout: 'radio',
          },
          initialValue: '2',
          validation: (Rule) => Rule.required(),
        },
        columnBody('column1', 'Column 1'),
        columnBody('column2', 'Column 2'),
        {
          ...columnBody('column3', 'Column 3'),
          hidden: ({ parent }) => parent?.columns !== '3',
        },
      ],
      preview: {
        select: { columns: 'columns' },
        prepare({ columns }) {
          return { title: `${columns || '2'}-Column Layout` }
        },
      },
    },
  ],
}
