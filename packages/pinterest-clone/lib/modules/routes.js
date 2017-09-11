import { addRoute, getDynamicComponent } from 'meteor/vulcan:core'

import PicsList from '../components/pics/PicsList.jsx'
//import MyPicsList from '../components/pics/MyPicsList.jsx'

addRoute([
  {
    name: 'home',
    path: '/',
    component: PicsList
  },
  {
    name: 'uploads',
    path: '/uploads',
    component: () => getDynamicComponent(import('../components/pics/MyPicsList.jsx'))
  }
])
