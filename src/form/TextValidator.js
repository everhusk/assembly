// @flow
import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { TextValidator as ExTextValidator } from 'react-material-ui-form-validator'

import { setErrorMessages } from './SelectValidator'

class TextValidator extends Component {
  render () {
    return <ExTextValidator {...setErrorMessages(this.props)} />
  }
}

export default withNamespaces()(TextValidator)
