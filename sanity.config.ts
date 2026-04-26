import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/sanity/schemaTypes'
import {projectId, dataset} from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'IOD Webshop Studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Singleton: Home Page
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.divider(),
            // All other documents, excluding singletons
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings', 'homePage'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
