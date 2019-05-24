// @flow
import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { SelectValidator as ExSelectValidator } from 'react-material-ui-form-validator'

export const setErrorMessages = (_props) => {
  const props = { ..._props }
  if (props.validators && (!props.errorMessages || !props.errorMessages.length)) {
    props.errorMessages = []
    for (let validator of props.validators) {
      props.errorMessages.push(props.t('form.' + validator))
    }
  }
  delete props.tReady
  delete props.i18nOptions
  delete props.defaultNS
  delete props.reportNS
  delete props.t

  return props
}

type Props = {
  t: () => {},
  validators: Array<string>,
  errorMessages?: Array<string>,
  [any]: any,
}

class SelectValidator extends Component<Props> {

  render () {
    return <ExSelectValidator {...setErrorMessages(this.props)} />
  }
}

export default withNamespaces()(SelectValidator)
