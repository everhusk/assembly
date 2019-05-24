// @flow
import React, { Component } from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Paper, Typography } from '@material-ui/core'
import { Trans } from 'react-i18next'
import gql from 'graphql-tag'

import type { RouterHistory } from 'react-router-dom'

import ProjectForm from './components/ProjectForm'
import { GET_GRAPH } from '../Dashboard'

import './style.scss'

export const CREATE_PROJECT = gql`
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      missions {
        id
      }
    }
  }
`

type Props = {|
  history: RouterHistory,
|}

export default class CreateProjectPage extends Component<Props> {

  handleCompleted = ({ createProject: { id } }) => {
    this.props.history.push('/projects/' + id)
  }

  refetchQueries = () => {
    return [{ query: GET_GRAPH }]
  }

  render () {
    return (
      <Paper elevation={2} className='profile-form'>
        <Typography variant='h5'><Trans i18nKey='project.create' /></Typography>
        <ApolloConsumer>
          {() => (
            <Mutation mutation={CREATE_PROJECT} onCompleted={this.handleCompleted} refetchQueries={this.refetchQueries}>
              {(submit) => {
                return <ProjectForm submit={submit} />
              }}
            </Mutation>
          )}
        </ApolloConsumer>
      </Paper>
    )
  }
}
