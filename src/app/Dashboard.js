// @flow
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { renderRoutes } from 'react-router-config'
import { matchPath } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { CircularProgress } from '@material-ui/core'
import gql from 'graphql-tag'
import Graph from 'vis-react'

import 'vis/dist/vis-network.min.css'

import type { RouterHistory } from 'react-router-dom'

import InitProfilePage from './profile/InitProfilePage'
import graphOptions, {
  animation,
  projectEdges,
  basicNode,
  initialGraph,
  GROUP_MISSIONS,
  GROUP_PROJECTS,
  GROUP_INSTITUTIONS,
} from './graphOptions'

export const IS_PROFILE_SET = gql`
  query IsProfileSet {
    me {
      firstName
    }
  }
`

export const GET_GRAPH = gql`
  query GetGraph {
    missions {
      id
      title
      projects {
        id
      }
    }
  }
`

type Props = {|
  t: () => {},
  route: Object,
  history: RouterHistory,
  match: {
    params: {
      id: string
    }
  },
|}

class Dashboard extends Component<Props> {

  constructor (props) {
    super()

    const { history } = props

    this.graph = this.cloneObject(initialGraph)
    this.ignoreHistoryUpdate = false

    // noinspection JSUnusedGlobalSymbols
    this.graphEvents = {
      select: (event) => {
        const { nodes } = event
        this.focus(nodes[0])
        const node = this.graph.nodes.find((node) => {
          return node.id === nodes[0]
        })
        let route
        if (node.group === GROUP_INSTITUTIONS) {
          route = '/missions'
        } else {
          route = '/' + node.group + '/' + node.id
        }
        this.ignoreHistoryUpdate = true
        history.push(route)
      },
      stabilized: () => {
        if (!this.state.isLoaded) {
          this.setState({ isLoaded: true })
          const toSelect = this.getToSelect(history.location) || basicNode
          this.select(toSelect)
          this.focus(toSelect)
        }
      },
      deselectNode: (event) => {
        if (!event.nodes.length) {
          this.network.selectNodes([basicNode], false)
        }
      },
    }

    history.listen((location) => {
      if (this.ignoreHistoryUpdate) {
        this.ignoreHistoryUpdate = false
        return
      }
      const toSelect = this.getToSelect(location) || basicNode
      this.select(toSelect)
      this.focus(toSelect)
    })
  }

  state = {
    isLoaded: false,
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    if (this.network) {
      this.network.redraw()
    }
  }

  getToSelect = (location) => {
    const { pathname } = location
    const missionsMatch = matchPath(pathname, { path: '/missions/:id' })
    const projectsMatch = matchPath(pathname, { path: '/projects/:id' })

    if (missionsMatch && missionsMatch.params.id) {
      return missionsMatch.params.id
    }
    if (projectsMatch && projectsMatch.params.id) {
      return projectsMatch.params.id
    }
    return null
  }

  getNetwork = (network) => {
    this.network = network
  }

  cloneObject (object) {
    return JSON.parse(JSON.stringify(object))
  }

  focus = (node) => {
    this.network.focus(node, {
      scale: node === basicNode ? 0.7014 : 1,
      animation,
    })
  }

  select = (toSelect) => {
    try {
      this.network.selectNodes([toSelect], false)
    } catch (e) {
      try {
        this.network.selectNodes([basicNode], false)
      } catch (e) { // eslint-disable-next-line no-console
        console.warn(e)
      }
    }
  }

  render () {
    return (
      <Query query={IS_PROFILE_SET}>
        {({ data, loading }) => {
          if (loading) return <CircularProgress size={80} />
          return data && data.me && data.me.firstName ? (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
              { !this.state.isLoaded ? <CircularProgress size={80} /> : (
                <div className='hover-container'>
                  {renderRoutes(this.props.route.routes)}
                </div>
              ) }
              <Query query={GET_GRAPH}>
                {({ data, loading }) => {
                  if (loading) return ''
                  const graph = this.cloneObject(initialGraph)
                  data.missions.map((mission) => {
                    graph.nodes.push({
                      id: mission.id,
                      group: GROUP_MISSIONS,
                      label: mission.title,
                    })
                    graph.edges.push({
                      id: basicNode + '-' + mission.id,
                      from: basicNode,
                      to: mission.id,
                    })
                    return mission.projects.map((project) => {
                      const isAdded = graph.nodes.find((node) => {
                        return node.id === project.id
                      })
                      if (!isAdded) {
                        graph.nodes.push({
                          id: project.id,
                          group: GROUP_PROJECTS,
                        })
                      }
                      return graph.edges.push({
                        id: mission.id + '-' + project.id,
                        from: mission.id,
                        to: project.id,
                        ...projectEdges,
                      })
                    })
                  })
                  this.graph = graph
                  const visibility = this.state.isLoaded ? 'visible' : 'hidden'
                  return (
                    <div className='graph-container' style={{ visibility }}>
                      <Graph
                        graph={this.graph}
                        options={graphOptions}
                        events={this.graphEvents}
                        getNetwork={this.getNetwork}
                      />
                    </div>
                  )
                }}
              </Query>
            </div>
          ) : (
            <InitProfilePage />
          )
        }}
      </Query>
    )
  }
}

export default withNamespaces()(Dashboard)
