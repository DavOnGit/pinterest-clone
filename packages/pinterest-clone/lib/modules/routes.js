import { addRoute, getDynamicComponent } from 'meteor/vulcan:core'

import PicsList from '../components/pics/PicsList.jsx'
import MyPicsList from '../components/pics/MyPicsList.jsx'

addRoute({
  name: 'home',
  path: '/',
  component: PicsList
})

addRoute({
  name: 'uploads',
  path: '/uploads',
  component: MyPicsList //() => getDynamicComponent(import('../components/pics/MyPicsList.jsx'))
})
