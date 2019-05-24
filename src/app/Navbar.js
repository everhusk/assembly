import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { AppBar, Button, Toolbar } from '@material-ui/core'

import type { RouterHistory } from 'react-router-dom'
import { Query } from 'react-apollo'
import { IS_PROFILE_SET } from './Dashboard'

type Props = {|
  t: () => {},
  location: {
    pathname: string,
  },
  client: any,
  isLoggedIn: boolean,
  history: RouterHistory
|}

class Navbar extends Component<Props> {

  handleLogout = (client) => () => {
    localStorage.removeItem('token') // noinspection JSIgnoredPromiseFromCall
    client.resetStore()
    this.props.history.push('/')
  }

  nav = (path) => () => {
    this.props.history.push(path)
  }

  render () {
    const { t, isLoggedIn, client, location: { pathname } } = this.props
    return (
      <AppBar position='static' className='navbar'>
        <Toolbar className='toolbar'>
          {/* eslint-disable-next-line */}
          <img src='/images/logo.png' alt='Assembly' onClick={this.nav('/')} />
          {pathname === '/' ? (
            <div className='buttons'>
              <Button color='inherit' size='large' onClick={this.nav('/')}>{t('app.explore')}</Button>
              <Button color='inherit' size='large' onClick={this.nav('/missions')}>{t('app.account')}</Button>
            </div>
          ) : ''}
          {pathname !== '/' && isLoggedIn ? (
            <div className='buttons'>
              <Query query={IS_PROFILE_SET}>
                {({ data, loading }) => {
                  if (loading) return ''
                  return data && data.me && data.me.firstName ? (
                    <span>
                      <Button color='inherit' size='large' onClick={this.nav('/project/create')}>
                        {t('app.createProject')}
                      </Button>
                      <Button color='inherit' size='large' onClick={this.nav('/profile')}>
                        {t('app.profile')}
                      </Button>
                    </span>
                  ) : ''
                }}
              </Query>
              <Button color='inherit' size='large' onClick={this.handleLogout(client)}>{t('app.logout')}</Button>
            </div>
          ) : ''}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withNamespaces()(Navbar)
