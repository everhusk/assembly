// @flow
import React, { Component } from 'react'
import { Paper, Avatar, Typography, Button } from '@material-ui/core'
import { Query } from 'react-apollo'
import { Trans } from 'react-i18next'
import gql from 'graphql-tag'

import type { RouterHistory } from 'react-router-dom'

import ProjectItem from '../project/components/ProjectItem'

import './style.scss'

export const GET_PROFILE = gql`
  query GetProfile {
    me {
      firstName
      lastName
      email
      github
      twitter
      projects {
        id
        title
      }
    }
  }
`

type Props = {|
  history: RouterHistory,
|}

export default class ProfilePage extends Component<Props> {

  handleEditClick = () => {
    this.props.history.push('/profile/edit')
  }

  render () {
    return (
      <Query query={GET_PROFILE}>
        {({ data, loading }) => {
          if (loading) return ''
          const { me } = data
          return (
            <Paper elevation={2} className='mission profile'>
              <img alt='' src='https://picsum.photos/662/440?image=152' />
              <Avatar alt='avatar' src='https://picsum.photos/662/440?image=5' className='avatar' />
              <div className='username'>
                <Button variant='contained' color='primary' onClick={this.handleEditClick}>Edit</Button>
                <Typography variant='h4'>{me.firstName} {me.lastName}</Typography>
                <a href='mailto:bshevchenkoweb@gmail.com'><Trans i18nKey='profile.message' /></a>
                {me.twitter ? <a href={me.twitter} target='_blank' rel='noopener noreferrer'>Twitter</a> : ''}
                {me.github ? <a href={me.github} target='_blank' rel='noopener noreferrer'>GitHub</a> : ''}
              </div>
              <div style={{ clear: 'both' }} />
              <br />
              <p className='header'>MISSION</p>
              <p>
                The 2030 Agenda acknowledges that eradicating poverty in all its forms and dimensions,
                including extreme poverty, is the greatest global challenge and an indispensable
                requirement for sustainable development.
              </p>
              {me.projects && me.projects.length > 0 ? (
                <div>
                  <hr />
                  <p>Owns</p>
                  {me.projects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              ) : ''}
            </Paper>
          )
        }}
      </Query>
    )
  }
}
