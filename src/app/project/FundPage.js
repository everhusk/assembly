import React, { Component } from 'react'
import Web3 from 'web3'
import { Trans, withNamespaces } from 'react-i18next'
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  TextField,
  Checkbox,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { Query } from 'react-apollo'

import type { RouterHistory } from 'react-router-dom'

import { GET_PROJECT } from './ProjectPage'
import NotFoundPage from '../NotFoundPage'

type Props = {|
  t: () => {},
  history: RouterHistory,
  match: {
    params: {
      id: string
    }
  }
|}

type State = {|
  from: ?number,
  to: ?number,
  terms: boolean,
  activeStep: number,
  isValidSwap: boolean,
  insufficientFunds: boolean,
  value: number,
  isValid: boolean,
  isAuthOpen: boolean,
  login: string,
|}

const initialState: State = {
  from: null,
  to: null,
  terms: false,
  activeStep: 0,
  isValidSwap: false,
  insufficientFunds: false,
  value: null,
  isValid: false,
  isAuthOpen: false,
  login: null,
}

class FundPage extends Component<Props, State> {

  state = initialState

  componentWillMount () {
    this.web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/b436a116fc1945b392244acb39fc25fc')
  }

  handleChangeFromTo = (event) => {
    let { value } = event.target
    value = parseInt(value, 10) || ''
    this.validateFromTo()
    this.setState({ from: value, to: value })
  }

  handleChangeValue = (event) => {
    let { value } = event.target
    value = parseInt(value, 10) || ''
    this.validateValue()
    this.setState({ value })
  }

  handleChangeTerms = (event, isChecked) => {
    this.setState({ terms: isChecked })
  }

  handleLoginChange = (event) => {
    this.setState({ login: event.target.value })
  }

  handleSkip = () => {
    this.setState({ ...initialState, activeStep: 1 })
  }

  handleGoBack = () => {
    this.setState({ ...initialState, activeStep: 0 })
  }

  handleSwap = () => {
    this.setState( { isAuthOpen: true })
  }

  handleFund = () => {
    this.setState({ isAuthOpen: true })
  }

  handleCloseAuth = () => {
    this.setState({ isAuthOpen: false })
  }

  handleSubmitAuth = () => {
    if (this.state.activeStep === 0) {
      this.swap()
    } else {
      this.fund()
    }
  }

  getSteps () {
    const { t } = this.props
    return [
      t('project.fund.step1'),
      t('project.fund.step2'),
    ]
  }

  swap () {
    // TODO
    this.setState({
      ...initialState,
      activeStep: 1,
      value: this.state.from,
      isValid: true,
    })
  }

  fund () {
    // TODO
    this.props.history.push('/projects/' + this.id())
  }

  validateFromTo = () => {
    const isSufficientBalance = true // TODO DAI
    if (isSufficientBalance) {
      this.setState({ isValidSwap: true, insufficientFunds: false })
    } else {
      this.setState({ insufficientFunds: true, isValidSwap: false })
    }
  }

  validateValue = () => {
    const isSufficientBalance = true // TODO UNT
    if (isSufficientBalance) {
      this.setState({ isValid: true, insufficientFunds: false })
    } else {
      this.setState({ insufficientFunds: true, isValid: false })
    }
  }

  id = () => {
    return this.props.match.params.id
  }

  step1 (project) {
    const { t } = this.props
    const { from, to, terms, isValidSwap } = this.state
    const isPositiveBalance = true // TODO
    const swapButton = (
      <Button color='primary' variant='contained' disabled={!terms || !isValidSwap} onClick={this.handleSwap}>
        {t('project.fund.swap')}
      </Button>
    )
    return (
      <div>
        <p>{project.title}</p>
        <TextField
          fullWidth
          label={t('project.fund.from')}
          type='number'
          value={from || ''}
          onChange={this.handleChangeFromTo}
        />
        <TextField
          fullWidth
          label={t('project.fund.to')}
          type='number'
          value={to || ''}
          style={{ marginTop: '15px' }}
          onChange={this.handleChangeFromTo}
        />
        <p>1 DAI = 1 UNITED NATIONS TOKEN = 0.998 USD</p>
        <p>
          <Checkbox name='terms' onChange={this.handleChangeTerms} />
          I understand that this information is being submitted to a public, immutable blockchain.
          No one, including Assembly core, will be able to take my funds.
        </p>
        {isPositiveBalance ? (
          <Grid container className='actions'>
            <Grid item xs={6}>
              <Button color='secondary' onClick={this.handleSkip}>{t('project.fund.skip')}</Button>
            </Grid>
            <Grid item xs={6} className='submit-wrapper'>
              {swapButton}
            </Grid>
          </Grid>
        ) : (
          <p align='center'>
            {swapButton}
          </p>
        )}
      </div>
    )
  }

  step2 () {
    const { t } = this.props
    const { value, isValid } = this.state
    return (
      <div>
        <p>{t('project.fund.transfer')}</p>
        <TextField
          fullWidth
          label={t('project.fund.wallet')}
          type='number'
          value={value || ''}
          style={{ marginTop: '15px' }}
          onChange={this.handleChangeValue}
        />
        <p>&nbsp;</p>
        <Grid container className='actions'>
          <Grid item xs={6}>
            <Button color='secondary' onClick={this.handleGoBack}>{t('project.fund.back')}</Button>
          </Grid>
          <Grid item xs={6} className='submit-wrapper'>
            <Button type='submit' color='primary' variant='contained' disabled={!isValid} onClick={this.handleFund}>
              {t('project.fund.fund')}
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  render () {
    const steps = this.getSteps()
    const { activeStep, insufficientFunds, isAuthOpen } = this.state
    return (
      <Query query={GET_PROJECT} variables={{ id: this.id() }}>
        {({ data, loading, error }) => {
          if (loading) return ''
          if (error) return <NotFoundPage />
          const { project } = data
          return (
            <Paper elevation={2} className='mission'>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography variant='h5'><Trans i18nKey='project.fund.title' /></Typography>
              {insufficientFunds ? (
                <p align='center' style={{ color: '#ff0000' }}>
                  <Trans i18nKey='project.fund.insufficient' />
                </p>
              ) : ''}

              {activeStep === 0 ? this.step1(project) : this.step2()}

              <Dialog
                open={isAuthOpen}
                onClose={this.handleCloseAuth}
                aria-labelledby='form-dialog-title'
              >
                <DialogTitle id='form-dialog-title'><Trans i18nKey='project.fund.auth.title' /></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Trans i18nKey='project.fund.auth.subtitle' />
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='login'
                    label='Private Key'
                    type='password'
                    fullWidth
                    onChange={this.handleLoginChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseAuth} color='primary'>
                    <Trans i18nKey='project.fund.auth.cancel' />
                  </Button>
                  <Button onClick={this.handleSubmitAuth} color='primary'>
                    <Trans i18nKey='project.fund.auth.submit' />
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          )
        }}
      </Query>
    )
  }
}

export default withNamespaces()(FundPage)
