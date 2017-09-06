import React from 'react';
import { Components, registerComponent, getFragment } from "meteor/vulcan:core";

import Pics from '../../modules/pics/collection.js';

const PicsEditForm = ({documentId, closeModal}) =>
  <div>
    <button type="button" className="close modal_close_btn" onClick={closeModal} aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
    <Components.SmartForm
      collection={Pics}
      documentId={documentId}
      mutationFragment={getFragment('PicsDetailsFragment')}
      showRemove={true}
      successCallback={document => {
        closeModal();
      }}
    />
  </div>

export default PicsEditForm;
