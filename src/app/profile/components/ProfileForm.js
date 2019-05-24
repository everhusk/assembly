// @flow
import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { Button, Grid } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import isURL from 'is-url'

import { TextValidator } from '../../../form'

type UserInput = {
  firstName: string,
  lastName: string,
  email: string,
  github?: string,
  twitter?: string,
}

type Props = {
  t: () => {},
  update: () => {},
  me?: UserInput,
  extended?: boolean,
}

type State = {
  user: UserInput,
}

class ProfileForm extends Component<Props, State> {

  constructor (props: Props) {
    super()

    if (props.me) {
      this.state = { user: props.me }
    }
  }

  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      twitter: '',
    },
  }

  componentDidMount () { // noinspection JSUnresolvedFunction
    ValidatorForm.addValidationRule('isGitHub', (value) => {
      if (!value) return true
      return isURL(value) && value.includes('//github.com/')
    }) // noinspection JSUnresolvedFunction
    ValidatorForm.addValidationRule('isTwitter', (value) => {
      if (!value) return true
      return isURL(value) && value.includes('//twitter.com/')
    })
  }

  handleChange = (event) => {
    const { user } = this.state
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.update({ variables: { profile: this.state.user } })
  }

  render () {
    const { t, extended } = this.props
    const { user } = this.state
    return (
      <ValidatorForm onSubmit={this.handleSubmit}>
        <Grid container spacing={32}>
          <Grid item xs={6}>
            <TextValidator
              label={t('profile.firstName')}
              onChange={this.handleChange}
              name='firstName'
              type='text'
              validators={['required']}
              value={user.firstName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextValidator
              label={t('profile.lastName')}
              onChange={this.handleChange}
              name='lastName'
              type='text'
              validators={['required']}
              value={user.lastName}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={8} className='field-wrapper'>
          <TextValidator
            label={t('profile.email')}
            onChange={this.handleChange}
            name='email'
            type='email'
            validators={['required', 'isEmail']}
            value={user.email}
            fullWidth
          />
        </Grid>
        {extended ? (
          <div>
            <Grid item xs={8} className='field-wrapper'>
              <TextValidator
                label='GitHub'
                onChange={this.handleChange}
                name='github'
                validators={['isGitHub']}
                value={user.github}
                fullWidth
              />
            </Grid>
            <Grid item xs={8} className='field-wrapper'>
              <TextValidator
                label='Twitter'
                onChange={this.handleChange}
                name='twitter'
                validators={['isTwitter']}
                value={user.twitter}
                fullWidth
              />
            </Grid>
          </div>
        ) : ''}
        <Grid container className='actions'>
          <Grid item xs={6} />
          <Grid item xs={6} className='submit-wrapper'>
            <Button type='submit' color='primary' variant='contained'>
              {t('profile.submit')}
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    )
  }
}

export default withNamespaces()(ProfileForm)
