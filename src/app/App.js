// @flow
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { renderRoutes } from 'react-router-config'
import { withNamespaces } from 'react-i18next'
import { Grid } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

import type { RouterHistory } from 'react-router-dom'

import Navbar from './Navbar'
import LandingPage from './landing/LandingPage'
import LoginPage from './login/LoginPage'
import theme from './theme'

import './style.scss'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

type Props = {|
  t: () => {},
  route: Object,
  location: {
    pathname: string,
  },
  history: RouterHistory
|}

class App extends Component<Props> {

  render () {
    const { route, location, history } = this.props
    return (
      <Query query={IS_LOGGED_IN}>
        {({ client, data }) => (
          <MuiThemeProvider theme={theme}>
            <Grid container spacing={16} className='root'>
              <Navbar client={client} isLoggedIn={data.isLoggedIn} location={location} history={history} />
              {this.props.location.pathname === '/' ? <LandingPage /> : (
                data.isLoggedIn ? renderRoutes(route.routes) : <LoginPage />
              )}
            </Grid>
          </MuiThemeProvider>
        )}
      </Query>
    )
  }
}

export default withNamespaces('translation')(App)
