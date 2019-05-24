// @flow
import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { ApolloConsumer, Mutation, Query } from 'react-apollo'
import { Trans } from 'react-i18next'

import type { RouterHistory } from 'react-router-dom'

import ProfileForm from './components/ProfileForm'
import { UPDATE_PROFILE } from './InitProfilePage'
import { GET_PROFILE } from './ProfilePage'

import './style.scss'

type Props = {|
  history: RouterHistory,
|}

export default class EditProfilePage extends Component<Props> {

  handleCompleted = () => {
    this.props.history.push('/profile')
  }

  render () {
    return (
      <Query query={GET_PROFILE}>
        {({ data, loading }) => {
          if (loading) return ''
          const { me } = data
          delete me.__typename
          delete me.projects
          return (
            <Paper elevation={2} className='profile-form'>
              <Typography variant='h5'><Trans i18nKey='profile.edit' /></Typography>
              <ApolloConsumer>
                {() => (
                  <Mutation
                    mutation={UPDATE_PROFILE}
                    onCompleted={this.handleCompleted}
                  >
                    {(update) => {
                      return <ProfileForm update={update} me={me} extended />
                    }}
                  </Mutation>
                )}
              </ApolloConsumer>
            </Paper>
          )
        }}
      </Query>
    )
  }
}
