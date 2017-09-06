/*

The main Comments collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Stars = createCollection({

  collectionName: 'Stars',

  typeName: 'Star',

  schema,

  resolvers: getDefaultResolvers('Stars'),

  mutations: getDefaultMutations('Stars'),

});

/*

Set a default results view whenever the Stars collection is queried:

- Comments are limited to those corresponding to the current picture
- They're sorted by their createdAt timestamp in ascending order

*/

Stars.addDefaultView(terms => ({ selector: { picId: terms.picId } }))

export default Stars
