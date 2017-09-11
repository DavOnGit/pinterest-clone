import React from 'react'
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core'
import { FormattedMessage } from 'meteor/vulcan:i18n'

import MasonryItem from './MasonryItem.jsx'
import Masonry from './MyMasonry.jsx'
import PicsNewForm from './PicsNewForm.jsx'

const MyPicsList = ({ currentUser, loading }) => {
    
    if (!loading && !currentUser) { return <p className="admin-home-message"><FormattedMessage id="app.noPermission" /></p>}
    
    return (
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
            terms={{view: 'userPics', userId: currentUser._id}}
          />
        }

        <div className='pic-add-icon'>
          <Components.ModalTrigger title='Add pics:' component={<Components.Icon name='new' />}>
            <PicsNewForm />
          </Components.ModalTrigger>
        </div>

      </div>
    )
  
}

export default withCurrentUser(MyPicsList)
