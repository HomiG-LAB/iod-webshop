import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Design / Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      title: 'Design Motif',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price (CHF)',
      type: 'number',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g. HOT, NEW DROP, TRENDING',
    }),
    defineField({
      name: 'badgeType',
      title: 'Badge Color Type',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Neon)', value: 'primary'},
          {title: 'Secondary (Blue/Purple)', value: 'secondary'},
          {title: 'Tertiary (Red/Orange)', value: 'tertiary'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      description: 'Wenn aktiv, wird das Produkt als "Coming Soon" angezeigt und kann nicht bestellt werden.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `CHF ${selection.subtitle || 0}.00`,
        media: selection.media
      }
    }
  }
})
