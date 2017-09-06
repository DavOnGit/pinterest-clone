import React from 'react'
import { Components, registerComponent } from 'meteor/vulcan:core'

import PicsDetail from './PicsDetails.jsx'

class MasonryItem extends React.Component {
  static getColumnSpanFromProps = ({ isFeatured }) => {
    if (isFeatured) {
      return 2
    }
    return 1
  }
  static getHeightFromProps = (props, columnSpan, columnGutter) => {
    const height = 300 / props.aspectRatio
    return height // IMAGE_HEIGHT + TITLE_HEIGHT + FOOTER_HEIGHT;
  }
  static displayName = 'MasonryItem'

  render() {
    const { _id, thumbnailUrl, commentsCount, style, currentUser} = this.props
    
    return(
      <div className="pics-item" style={style}>

        <Components.ModalTrigger
          component={<div className="pics-image"><img src={thumbnailUrl} /></div>}
          className="pics-details-modal"
        >
          <PicsDetail documentId={_id} currentUser={currentUser} />
        </Components.ModalTrigger>

        <div className="pics-meta">

          <div className="pics-comment-count">
            <Components.Icon name="comment" /> {commentsCount}
          </div>

        </div>

      </div>
    )
  }
}

export default MasonryItem
