import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'titlePart1', title: 'Title Part 1 (e.g. SECOND)', type: 'string' }),
        defineField({ name: 'titlePart2', title: 'Title Part 2 (e.g. SKIN.)', type: 'string' }),
        defineField({ name: 'titlePart3', title: 'Title Part 3 (e.g. BUT WITH A)', type: 'string' }),
        defineField({ name: 'titlePart4', title: 'Title Part 4 (e.g. STATEMENT.)', type: 'string' }),
        defineField({ name: 'subTagline', title: 'Sub Tagline', type: 'text' }),
        defineField({ name: 'cta1', title: 'CTA 1 Text', type: 'string' }),
        defineField({ name: 'cta2', title: 'CTA 2 Text', type: 'string' }),
        defineField({ name: 'backgroundImage', title: 'Background Image/Poster', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'usp',
      title: 'USP Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'points',
          title: 'USP Points',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon (Material Symbol)', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'age', title: 'Age Group (e.g. Kleinkind)', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'icon', title: 'Icon (Material Symbol)', type: 'string' }),
                defineField({
                  name: 'color',
                  title: 'Theme Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary (Lime)', value: 'primary' },
                      { title: 'Secondary (Cyan)', value: 'secondary' },
                      { title: 'Tertiary (Pink)', value: 'tertiary' },
                    ],
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Story Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'image', title: 'Story Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'lookbook',
      title: 'Lookbook Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({
          name: 'shots',
          title: 'Lookbook Shots',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                defineField({ name: 'tag', title: 'Tag', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'string' }),
        defineField({ name: 'placeholder', title: 'Input Placeholder', type: 'string' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Content',
      }
    },
  },
})
