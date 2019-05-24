// @flow
import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import ethWallet from 'ethereumjs-wallet'
import ClipboardJS from 'clipboard'
import { TextField, Button, Grid } from '@material-ui/core'

type Props = {
  t: () => {},
  login: () => {},
}

class LoginForm extends Component<Props> {

  state = {
    login: '',
    isGenerated: null,
    isValid: null,
  }

  componentDidMount () {
    const { t } = this.props
    const self = this
    this.clipboard = new ClipboardJS('#generate', {
      text () {
        const wallet = ethWallet.generate()
        const buf2hex = (buffer) => {
          return Array.prototype.map.call(new Uint8Array(buffer), (x) => `00${x.toString(16)}`.slice(-2)).join('')
        }
        const keys = {
          private: buf2hex(wallet.getPrivateKey()),
          public: buf2hex(wallet.getPublicKey()),
        }
        self.validateKey(keys.private)
        self.setState({ login: keys.private, isGenerated: true })
        return t('login.clipboard', keys)
      },
    })
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }

  handleChange = (event) => {
    this.setState({ login: event.target.value })
    this.validateKey(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.isValid) {
      this.props.login({ variables: { login: this.state.login } })
    } else {
      if (this.state.isValid === null) {
        this.validateKey(event.target.value)
      }
    }
  }

  validateKey = (key) => {
    let isValid = true
    try {
      ethWallet.fromPrivateKey(
        Buffer.from(
          new Uint8Array(key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))),
        ),
      )
    } catch (e) {
      isValid = false
    }
    this.setState({ isValid })
  }

  render () {
    const { t } = this.props
    const { login, isValid, isGenerated } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name='login'
          fullWidth
          placeholder={t('login.login')}
          value={login}
          onChange={this.handleChange}
          error={isValid === false}
          helperText={isValid === false ? t('login.invalid') : (isGenerated ? t('login.generated') : '')}
        />
        <Grid container className='actions'>
          <Grid item xs={6}>
            <Button color='secondary' id='generate'>{t('login.generate')}</Button>
          </Grid>
          <Grid item xs={6} className='submit-wrapper'>
            <Button type='submit' color='primary' variant='contained'>
              {t('login.submit')}
            </Button>
          </Grid>
        </Grid>
      </form>

    )
  }
}

export default withNamespaces()(LoginForm)
