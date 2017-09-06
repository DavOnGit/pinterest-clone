/*

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core'

registerFragment(`
  fragment StarsItemFragment on Star {
    _id
    userId
    picId
  }
`)
