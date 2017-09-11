import React from 'react'
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core'

import MasonryItem from './MasonryItem.jsx'
import Masonry from './Masonry.jsx'
import PicsNewForm from './PicsNewForm.jsx'

const PicsList = ({ currentUser, loading }) => (
  <div className='pic-list'>
    {loading ?
      <Loading /> :
      <Masonry
        itemComponent={MasonryItem}
        loadingElement={
          <div className="loading-masonry">
            <Loading />
          </div>
        }
        columnWidth={300}
        columnGutter={20}
        currentUser={currentUser}
      />
    }

    {!loading && currentUser ?
      <div className='pic-add-icon'>
        <Components.ModalTrigger title='Add pics:' component={<div><Components.Icon name='new' /></div>}>
          <PicsNewForm />
        </Components.ModalTrigger>
      </div> : null
    }
  </div>
)


export default withCurrentUser(PicsList)
