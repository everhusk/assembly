// @flow
import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ProjectItem from '../project/components/ProjectItem'

import './style.scss'

const GET_MISSION = gql`
  query GetMission($id: ID!) {
    mission(id: $id) {
      id
      title
      description
      projects {
        id,
        title
      }
    }
  }
`

type Props = {|
  match: {
    params: {
      id: string
    }
  }
|}

export default class MissionPage extends Component<Props> {
  render () {
    return (
      <Query query={GET_MISSION} variables={{ id: this.props.match.params.id }}>
        {({ data, loading }) => {
          if (loading) return ''
          const { mission } = data
          return (
            <Paper elevation={2} className='mission'>
              <img alt='' src={'https://picsum.photos/662/465?image=' + Math.floor(Math.random() * 5 + 52)} />
              <p className='header'>{mission.title}</p>
              <p>
                The 2030 Agenda acknowledges that eradicating poverty in all its forms and dimensions,
                including extreme poverty, is the greatest global challenge and an indispensable
                requirement for sustainable development.
              </p>
              <p>
                The first Sustainable Development Goal aims to “End poverty in all its forms everywhere”.
                Its seven associated targets aims, among others, to eradicate extreme poverty for
                all people everywhere, reduce at least by half the proportion of men, women and children
                of all ages living in poverty, and implement nationally appropriate social protection systems
                and measures for all, including floors, and by 2030 achieve substantial coverage of the poor
                and the vulnerable.
              </p>
              <hr />
              <p>Projects</p>
              {mission.projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </Paper>
          )
        }}
      </Query>
    )
  }
}
