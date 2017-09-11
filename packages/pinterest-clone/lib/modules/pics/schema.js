import PicUpload from '../../components/pics/PicUploader.jsx'

const schema = {

  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver(pic, args, context) {
        return context.Users.findOne({ _id: pic.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },

  // custom properties

  imageUrl: {
    label: 'Upload images from your device',
    type: String,
    control: PicUpload,
    form: {
      options: {
        preset: 'x3jxz0ds'
      }
    },
    viewableBy: ['guests'],
    insertableBy: ['members']
  },
  thumbnailUrl: {
    type:  String,
    hidden: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onEdit: (document) => {
      return document.thumbnailUrl;
    }
  },
  aspectRatio: {
    type: Number,
    hidden: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onEdit: (document) => {
      return document.aspectRatio;
    }
  },
  body: {
    label: 'Body',
    type: String,
    optional: true,
    control: 'textarea', // use a textarea form component
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },

  isFeatured: {
    type: Boolean,
    onInsert: () => false,
    hidden: true,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members']
  },

  // GraphQL-only field

  commentsCount: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    hidden: true,
    resolveAs: {
      fieldName: 'commentsCount',
      type: 'Float',
      resolver(pic, args, context) {
        return context.Comments.find({picId: pic._id}).count()
      }
    }
  }

  // starsCount: {
  //   type: Number,
  //   optional: true,
  //   viewableBy: ['guests'],
  //   hidden: true,
  //   resolveAs: {
  //     fieldName: 'starsCount',
  //     type: 'Float',
  //     resolver(pic, args, context) {
  //       return context.Stars.find({picId: pic._id}).count()
  //     }
  //   }
  // }
}

export default schema
