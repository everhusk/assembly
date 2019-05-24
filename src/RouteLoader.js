import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from './app/routes'

class RouteLoader extends Component {
  render () {
    return renderRoutes(routes)
  }
}

export default withRouter(RouteLoader)
