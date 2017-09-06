import { registerFragment } from 'meteor/vulcan:core'

registerFragment(`
  fragment PicsItemFragment on Pic {
    _id
    createdAt
    userId
    thumbnailUrl
    aspectRatio
    commentsCount
    isFeatured
  }
`);

registerFragment(`
  fragment PicsDetailsFragment on Pic {
    _id
    createdAt
    userId
    user {
      displayName
    }
    imageUrl
    commentsCount
    body
  }
`)
