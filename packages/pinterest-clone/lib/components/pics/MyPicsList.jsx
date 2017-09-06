import React from 'react'
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core'
import { FormattedMessage } from 'meteor/vulcan:i18n'

import MasonryItem from './MasonryItem.jsx'
import Masonry from './ModMasonry.jsx'
import PicsNewForm from './PicsNewForm.jsx'

class MyPicsList extends React.PureComponent {
  
  render () {
    const { currentUser, loading } = this.props
    
    if (!currentUser) { return <p className="admin-home-message"><FormattedMessage id="app.noPermission" /></p>}
    
    return (
      <div className='pic-list'>

        {loading ?
          <Loading /> :
          <Masonry
            itemComponent={MasonryItem}
            alignCenter={true}
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
}

export default withCurrentUser(MyPicsList)
