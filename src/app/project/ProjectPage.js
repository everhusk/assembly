// @flow
import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@material-ui/icons'

import type { RouterHistory } from 'react-router-dom'

import NotFoundPage from '../NotFoundPage'

import './style.scss'

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      missions {
        id
        title
      }
    }
  }
`

type Props = {|
  history: RouterHistory,
  match: {
    params: {
      id: string
    }
  }
|}

export default class ProjectPage extends Component<Props> {

  id = () => {
    return this.props.match.params.id
  }

  handleFundClick = () => {
    this.props.history.push(`/projects/${this.id()}/fund`)
  }

  render () {
    return (
      <Query query={GET_PROJECT} variables={{ id: this.id() }}>
        {({ data, loading, error }) => {
          if (loading) return ''
          if (error) return <NotFoundPage />
          const { project } = data
          return (
            <Paper elevation={2} className='mission'>
              <img alt='' src={'https://picsum.photos/662/465?image=' + Math.floor(Math.random() * 5 + 60)} />
              <p className='header'>{project.title}</p>
              <p>
                Tiko aims to connect healthcare practitioners such as nurses, doctors, dentists with those
                living remotely, giving them better answers to questions. This allows doctors around the
                world to donate their time to evaluate someone in distress and request further care.
              </p>
              <Button variant='contained' color='primary' onClick={this.handleFundClick}>Fund</Button>
              <hr />
              <p>Missions</p>
              {project.missions.map((mission) => (
                <Paper key={mission.id} elevation={4} className='project'>
                  <img alt='' src={'https://picsum.photos/195/355?image=' + Math.floor(Math.random() * 7 + 10)} />
                  <div>
                    <Typography variant='subtitle1'>United Nations</Typography>
                    <Typography variant='h5'>{mission.title}</Typography>
                    <p>
                      The 2030 Agenda acknowledges that eradicating poverty in all its forms and dimensions,
                      including extreme poverty, is the greatest global challenge and an indispensable
                      requirement for sustainable development.
                    </p>
                    <Link to={'/missions/' + mission.id}>
                      <Button>
                        Learn more
                        &nbsp;&nbsp;&nbsp;
                        <ArrowForward />
                      </Button>
                    </Link>
                  </div>
                </Paper>
              ))}
            </Paper>
          )
        }}
      </Query>
    )
  }
}
