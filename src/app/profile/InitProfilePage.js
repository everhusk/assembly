// @flow
import React, { Component } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Paper, Typography } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'

import { IS_PROFILE_SET } from '../Dashboard'
import ProfileForm from './components/ProfileForm'

import './style.scss'

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile)
  }
`

type Props = {
  t: () => {},
}

class InitProfilePage extends Component<Props> {

  refetchQueries = () => {
    return [{ query: IS_PROFILE_SET }]
  }

  render () {
    const { t } = this.props
    return (
      <Grid item xs={12}>
        <div className='profile-form-wrapper'>
          <Typography variant='h5' className='welcome'>&nbsp;</Typography>
          <Paper elevation={1} className='profile-form'>
            <Typography variant='h6'>{t('profile.title')}</Typography>
            <Typography>{t('profile.subtitle')}</Typography>
            <ApolloConsumer>
              {() => (
                <Mutation mutation={UPDATE_PROFILE} refetchQueries={this.refetchQueries}>
                  {(update) => {
                    return <ProfileForm update={update} />
                  }}
                </Mutation>
              )}
            </ApolloConsumer>
          </Paper>
        </div>
      </Grid>
    )
  }
}

export default withNamespaces()(InitProfilePage)
