// @flow
import React, { Component } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Paper, Typography } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'

import LoginForm from './components/LoginForm'

import './style.scss'

export const LOGIN_USER = gql`
  mutation login($login: String!) {
    login(login: $login)
  }
`

type Props = {
  t: () => {},
}

class LoginPage extends Component<Props> {

  handleCompleted = (client) => ({ login }) => {
    localStorage.setItem('token', login)
    client.writeData({ data: { isLoggedIn: true } })
  }

  render () {
    const { t } = this.props
    return (
      <Grid item xs={12}>
        <div className='login-wrapper'>
          <Typography variant='h5' className='welcome'>{t('login.welcome')}</Typography>
          <Paper elevation={1} className='login'>
            <Typography variant='h6'>{t('login.title')}</Typography>
            <Typography>{t('login.subtitle')}</Typography>
            <ApolloConsumer>
              {(client) => (
                <Mutation
                  mutation={LOGIN_USER}
                  onCompleted={this.handleCompleted(client)}
                >
                  {(login) => {
                    return <LoginForm login={login} />
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

export default withNamespaces()(LoginPage)
