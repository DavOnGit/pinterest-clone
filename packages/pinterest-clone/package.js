Package.describe({
  name: 'pinterest-clone'
})

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',

    // third-party packages
    'fourseven:scss@4.5.0'

  ]);

  api.mainModule('lib/server/main.js', 'server')
  api.mainModule('lib/client/main.js', 'client')

  api.addFiles(['lib/stylesheets/main.scss'], ['client'])

  api.addAssets([
    'lib/static/pixy.png',
    'lib/static/icon.png'
  ], ['client']);
})
