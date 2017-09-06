const schema = {

  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  // createdAt: {
  //   type: Date,
  //   optional: true,
  //   viewableBy: ['guests'],
  //   onInsert: (document, currentUser) => {
  //     return new Date();
  //   }
  // },
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },

  // custom properties

  picId: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    hidden: true, // never show this in forms
  },

};

export default schema;
