import {type SchemaTypeDefinition} from 'sanity'
import {productType} from './product'
import {orderType} from './order'
import {siteSettingsType} from './siteSettings'
import {teamMemberType} from './teamMember'
import {userType} from './user'
import {homePageType} from './homePage'

export const schemaTypes: SchemaTypeDefinition[] = [
  productType,
  orderType,
  siteSettingsType,
  homePageType,
  teamMemberType,
  userType,
]
