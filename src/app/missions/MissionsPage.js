// @flow
import React, { Component } from 'react'
import { Paper, Avatar } from '@material-ui/core'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import type { RouterHistory } from 'react-router-dom'

import './style.scss'

const GET_MISSIONS = gql`
  query GetMissionsTile {
    missions {
      id
      title
    }
  }
`

type Props = {|
  history: RouterHistory,
|}

export default class MissionsPage extends Component<Props> {

  handleClick = (id) => () => {
    this.props.history.push('/missions/' + id)
  }

  render () {
    return (
      <Query query={GET_MISSIONS}>
        {({ data, loading }) => {
          if (loading) return ''
          let i = 9
          return (
            <div className='missions'>
              {data.missions.map((mission) => {
                i++
                if (i === 17) i = 10
                return (
                  <Paper elevation={3} key={mission.id} onClick={this.handleClick(mission.id)}>
                    <img alt='' src={'https://picsum.photos/181/145?image=' + i} />
                    <div className='mission-title'>{mission.title}</div>
                    <div className='mission-contributors'>
                      <Avatar alt='' src='https://picsum.photos/15/15?image=0' />
                      <Avatar alt='' src='https://picsum.photos/15/15?image=1' />
                      join Bob, Marie & 58 others
                    </div>
                  </Paper>
                )
              })}
            </div>
          )
        }}
      </Query>
    )
  }
}
