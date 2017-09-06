import React from 'react';
import { Components, registerComponent, withCurrentUser, getFragment } from 'meteor/vulcan:core';

import Pics from '../../modules/pics/collection.js';

const PicsNewForm = ({currentUser, closeModal}) =>

  <div>

    {Pics.options.mutations.new.check(currentUser) ?
      <Components.SmartForm
        collection={Pics}
        mutationFragment={getFragment('PicsItemFragment')}
        successCallback={closeModal}
      /> :
      null
    }

  </div>

export default withCurrentUser(PicsNewForm)
