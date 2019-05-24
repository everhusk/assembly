// @flow
import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { Button, Grid, MenuItem } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { TextValidator, SelectValidator } from '../../../form'

const GET_MISSIONS = gql`
  query GetMissionsSelect {
    missions {
      id
      title
    }
  }
`

type ProjectInput = {
  title: string,
  description: string,
  missions: Array<string>,
}

type Props = {
  t: () => {},
  submit: () => {},
}

type State = {
  project: ProjectInput,
}

class ProjectForm extends Component<Props, State> {

  state = {
    project: {
      title: '',
      description: '',
      missions: [],
    },
  }

  handleChange = (event) => {
    const { project } = this.state
    project[event.target.name] = event.target.value
    this.setState({ project })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submit({ variables: { project: this.state.project } })
  }

  render () {
    const { t } = this.props
    const { project } = this.state
    return (
      <ValidatorForm onSubmit={this.handleSubmit}>
        <Grid item xs={8} className='field-wrapper'>
          <TextValidator
            label={t('project.title')}
            onChange={this.handleChange}
            name='title'
            validators={['required']}
            value={project.title}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} className='field-wrapper'>
          <TextValidator
            label={t('project.description')}
            onChange={this.handleChange}
            name='description'
            validators={['required']}
            value={project.description}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={8} className='field-wrapper'>
          <Query query={GET_MISSIONS}>
            {({ data: { missions } }) => (
              <SelectValidator
                value={this.state.project.missions}
                name='missions'
                validators={['required']}
                onChange={this.handleChange}
                SelectProps={{
                  multiple: true,
                }}
              >
                {missions.map((mission) => <MenuItem key={mission.id} value={mission.id}>{mission.title}</MenuItem>)}
              </SelectValidator>
            )}
          </Query>
        </Grid>
        <Grid container className='actions'>
          <Grid item xs={6} />
          <Grid item xs={6} className='submit-wrapper'>
            <Button type='submit' color='primary' variant='contained'>
              {t('project.submit')}
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    )
  }
}

export default withNamespaces()(ProjectForm)
