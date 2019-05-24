import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@material-ui/icons'

type Props = {
  project: any,
}

export default class ProjectItem extends Component<Props> {
  render () {
    const { project } = this.props
    return (
      <Paper elevation={4} className='project'>
        <img alt='' src={'https://picsum.photos/195/355?image=' + Math.floor(Math.random() * 5 + 75)} />
        <div>
          <Typography variant='subtitle1'>Ongoing</Typography>
          <Typography variant='h5'>{project.title}</Typography>
          <p>
            Tiko aims to connect healthcare practitioners such as nurses, doctors,
            dentists with those living remotely, giving them better answers to questions.
            This allows doctors around the world to donate their time to evaluate someone in
            distress and request further care.
          </p>
          <Link to={'/projects/' + project.id}>
            <Button>
              Learn more
              &nbsp;&nbsp;&nbsp;
              <ArrowForward />
            </Button>
          </Link>
        </div>
      </Paper>
    )
  }
}
