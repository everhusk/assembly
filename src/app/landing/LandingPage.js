// @flow
import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'

import './style.scss'

type Props = {
  t: () => {},
}
// background-image: url('/images/map.png') !important;
class LandingPage extends Component<Props> {

  render () {
    const { t } = this.props
    return (
      <Grid item xs={12} className='landing'>
        <div className='bg' />
        <Typography variant='h4' className='title'>{t('landing.title')}</Typography>
      </Grid>
    )
  }
}

export default withNamespaces()(LandingPage)
