import { registerFragment } from 'meteor/vulcan:core'

registerFragment(`
  fragment CommentsItemFragment on Comment {
    _id
    createdAt
    userId
    user {
      displayName
    }
    picId
    body
  }
`)
