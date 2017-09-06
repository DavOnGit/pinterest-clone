import React from 'react'
// import Masonry from 'react-masonry-component'
import { Components, withList, withCurrentUser, Loading } from 'meteor/vulcan:core'
import Pics from '../../modules/pics/collection.js'
import Meteor from 'meteor/meteor'
//import debounceScroll from '../../modules/helpers/debounce.js'

import MasonryItem from './MasonryItem.jsx'
import Masonry from './Masonry.jsx'
import PicsNewForm from './PicsNewForm.jsx'

// const noMasonry = () => ({
//   top: ~~(Math.random() * 100) + '%',
//   left: ~~(Math.random() * 100) + '%',
// })

//const PicsList = ({results = [], currentUser, loading, loadMore, count, totalCount, ownProps}) => {
class PicsList extends React.PureComponent {
  state = {
    fetchingItems: false,
    dpr: 1
  }
  
  componentWillMount() {
    if (Meteor.isClient) {
      const dpr = window && window.devicePixelRatio ? window.devicePixelRatio : 1
      if (dpr > 1) { this.setState({ dpr }) }
    }
    //this.handleScroll = debounceScroll(this.handleScroll, 100)
    //console.log('will mount: ' + this.props.networkStatus)
  }
  // componentDidMount () {
  //   window.addEventListener('scroll', this.handleScroll, false)
  //   // this.masonry.on('layoutComplete', this.handleLayoutComplete)
  //   //console.log('did mount: ' + this.props.networkStatus)
  // }
  componentWillReceiveProps (newProps) {
    //console.log('will receive props: ' , this.props , newProps)
    // console.log(this.props)
    // console.log(newProps)
    if (this.props.count < newProps.count) {
      this.setState({ fetchingItems: false })
    }
  }
  // componentWillUnmount () {
  //   window.removeEventListener('scroll', this.handleScroll)
  //   // this.masonry.off('layoutComplete', this.handleLayoutComplete)
  // }
  // handleScroll = () => {
  //   if (this.props.count === this.props.totalCount) { return }
  //   var d = document.body;
  //   var offset = d.scrollTop + window.innerHeight;
  //   var height = d.offsetHeight;
  //   //console.log(document.body.scrollTop, document.body.offsetHeight)
  //   //console.log('scrollTop = ' + d.scrollTop)
  //   console.log('offset = ' + offset);
  //   console.log('height = ' + height);
  //
  //   if (offset === height) {
  //     console.log('At the bottom');
  //     this.props.loadMore()
  //   }
  // }
  // handleImagesLoaded = (imagesLoadedInstance) => {
  //   console.log(imagesLoadedInstance)
  // }
  // handleLayoutComplete = (laidOutItems) => {
  //   console.log(laidOutItems)
  // }
  // loadItems = () => {
  //   const { results, hasMore, fetching } = this.state
  //   //if (nextPage > Math.ceil(totalCount / 6)) { return }
  //   if (!fetching) {
  //     this.props.loadMore()
  //     this.setState({ fetching: true})
  //   }
  // }
  handleLoadMore = () => {
    if (this.props.count < this.props.totalCount && !this.state.fetchingItems) {
      this.setState({ fetchingItems: true })
      this.props.loadMore()
      //window.setTimeout(() => {}, 2000)
    }
    return
  }
  render () {
    const { results, currentUser, count, totalCount } = this.props
    return (
      <div className='pic-list'>
        {!results ?
          <Loading /> :
          <Masonry
            items={results}
            itemComponent={MasonryItem}
            alignCenter={true}

            loadingElement={
              <div className="loading-masonry">
                <Loading />
              </div>
            }
            columnWidth={300}
            columnGutter={20}
            hasMore={count < totalCount}
            isLoading={this.state.fetchingItems}
            onInfiniteLoad={this.handleLoadMore}
            currentUser={currentUser}
          />
        }


        {
          currentUser
            ?
              <div className='pic-add-icon'>
                <Components.ModalTrigger title='Add pics:' component={<Components.Icon name='new' />}>
                  <PicsNewForm />
                </Components.ModalTrigger>
              </div>
            : null
        }
      </div>
    )
  }
}

const options = {
  collection: Pics,
  fragmentName: 'PicsItemFragment',
  limit: 6
}

export default withList(options)(withCurrentUser(PicsList))
