import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'
import './fragments.js'
import './permissions.js'

const Pics = createCollection({

  collectionName: 'Pics',

  typeName: 'Pic',

  schema,

  resolvers: getDefaultResolvers('Pics'),

  mutations: getDefaultMutations('Pics'),

})

Pics.addDefaultView(terms => ({
    options: {sort: {createdAt: -1}}
}))

Pics.addView('userPics', terms => ({
  selector: {userId: terms.userId},
  options: {sort: {createdAt: -1}}
}))

export default Pics
