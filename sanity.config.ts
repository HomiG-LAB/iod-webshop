import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {projectId, dataset} from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'IOD Webshop Studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
