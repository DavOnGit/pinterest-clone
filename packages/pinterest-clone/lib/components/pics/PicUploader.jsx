/*

This component supports either uploading and storing a single image, or
an array of images.

Note also that an image can be stored as a simple string, or as an array of formats
(each format being itself an object).

*/
import { Components, getSetting, registerComponent } from 'meteor/vulcan:lib'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import 'isomorphic-fetch' // patch for browser which don't have fetch implemented

/*

Get a URL from an image or an array of images

*/
const getImageUrl = imageOrImageArray => {
  // if image is actually an array of formats, use first format
  const image = Array.isArray(imageOrImageArray) ? imageOrImageArray[0] : imageOrImageArray
  // if image is an object, return secure_url else return image itself
  const imageUrl = typeof image === 'string' ? image : image.secure_url
  return imageUrl
}

/*

Remove the nth item from an array

*/
const removeNthItem = (array, n) => [..._.first(array, n), ..._.rest(array, n+1)]

/*

Display a single image

*/
class Image extends PureComponent {
  clearImage = (e) => {
    e.preventDefault()
    this.props.clearImage(this.props.index)
  }

  render() {
    return (
      <div>
        <a href="javascript:void(0)" onClick={this.clearImage}><Components.Icon name="close"/> Remove image</a>
        <img style={{height: 120}} src={getImageUrl(this.props.image)} />
      </div>
    )
  }
}

/*

Cloudinary Image Upload component

*/
class Upload extends PureComponent {

  constructor(props, context) {
    super(props)

    const isEmpty = this.enableMultiple() ? props.value.length === 0 : !props.value
    const emptyValue = this.enableMultiple() ? [] : ''

    this.state = {
      preview: '',
      uploading: false,
      value: isEmpty ? emptyValue : props.value,
    }
  }

  /*

  Add to autofilled values so SmartForms doesn't think the field is empty
  if the user submits the form without changing it

  */
  componentWillMount() {
    const isEmpty = this.enableMultiple() ? this.props.value.length === 0 : !this.props.value
    const emptyValue = this.enableMultiple() ? [] : ''
    this.context.addToAutofilledValues({[this.props.name]: isEmpty ? emptyValue : this.props.value})
  }

  /*

  Check the field's type to decide if the component should handle
  multiple image uploads or not

  */
  enableMultiple = () => {
    return this.props.datatype.definitions[0].type === Array
  }

  /*

  When an image is uploaded

  */
  onDrop = (files) => {
    console.log(this) // eslint-disable-line
    // set the component in upload mode with the preview
    this.setState({
      preview: this.enableMultiple ? [...this.state.preview, files[0].preview] : files[0].preview,
      uploading: true,
    })

    // request url to cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${getSetting('cloudinary').cloudName}/upload`

    // request body
    const body = new FormData()
    body.append('file', files[0])
    body.append('upload_preset', this.props.options.preset)

    // post request to cloudinary
    fetch(cloudinaryUrl, {
      method: 'POST',
      body,
    })
    .then(res => res.json()) // json-ify the readable strem
    .then(body => {
      // use the https:// url given by cloudinary or eager property if using transformations
      const imageUrl = body.secure_url
      const thumbUrl = body.eager ? body.eager[0].secure_url : ''
      const aspectRatio = body.width / body.height
      
      const value = this.enableMultiple() ? [...this.state.value, imageUrl] : imageUrl
      const thumbnailUrl = this.enableMultiple() ? [...this.state.thumbValue, thumbUrl] : thumbUrl
        

      // set the uploading status to false
      this.setState({
        preview: '',
        uploading: false,
        value,
        thumbnailUrl
      })

      // tell vulcanForm to catch the value
      this.context.addToAutofilledValues({
        [this.props.name]: value,
        thumbnailUrl,
        aspectRatio
      })
    })
    .catch(err => console.log('err', err)) // eslint-disable-line
  }

  /*

  Remove the image at `index` (or just remove image if no index is passed)

  */
  clearImage = (index) => {
    const value = this.enableMultiple() ? removeNthItem(this.state.value, index): ''
    const thumbValue = this.enableMultiple() ? removeNthItem(this.state.thumbValue, index) : ''
    this.context.addToAutofilledValues({[this.props.name]: value, thumbnailUrl: thumbValue})
    this.setState({
      preview: value,
      value,
      thumbValue
    })
  }

  render() {
    const { uploading, preview, value, thumbValue } = this.state
    // show the actual uploaded image or the preview
    const imageData = preview || thumbValue || value

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <div className="upload-field">
            <Dropzone ref="dropzone"
              multiple={this.enableMultiple()}
              onDrop={this.onDrop}
              accept="image/*"
              className="dropzone-base"
              activeClassName="dropzone-active"
              rejectClassName="dropzone-reject"
            >
              <div>Drop an image here, or click to select an image to upload:</div>
            </Dropzone>

            {imageData ?
              <div className="upload-state">
                {uploading ? <span>Uploading…</span> : null}
                <div className="images">
                  {this.enableMultiple() ?
                    imageData.map((image, index) => <Image clearImage={this.clearImage} key={index} index={index} image={image}/>) :
                    <Image clearImage={this.clearImage} image={imageData}/>
                  }
                </div>
              </div>
            : null}
          </div>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
}

Upload.contextTypes = {
  addToAutofilledValues: PropTypes.func,
}

registerComponent('Upload', Upload)

export default Upload
