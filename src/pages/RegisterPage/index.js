import React, { Component } from 'react'
import styled from 'styled-components'
import { Segment, Step, Button, Icon, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

import * as api from 'api'

import { PeopleContext } from 'contexts'

import PersonalInformationStep from './PersonalInformationStep'
import InventoryStep from './InventoryStep'
import LocationStep from './LocationStep'

const PERSONAL_INFORMATION_STEP = 'PERSONAL_INFORMATION_STEP'
const INVENTORY_STEP = 'INVENTORY_STEP'
const LOCATION_STEP = 'LOCATION_STEP'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
`

const Panel = styled(Segment)`
  padding: 2rem !important;
`

const ActionSection = styled.section`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`

export default class RegisterPage extends Component {
  state = {
    step: PERSONAL_INFORMATION_STEP,
    personId: null,
    name: '',
    age: '',
    gender: '',
    lonlat: '',
    items: '',
    errors: [],
    loading: false
  }

  onValueChange = (key) => (value) => {
    this.setState(() => ({
      [key]: value
    }))
  }

  onInputChange = (key) => (evt) => {
    const value = evt.target.value
    this.setState(() => ({
      [key]: value
    }))
  }

  onDropdownChange = (key) => (evt, data) => {
    const { value } = data
    this.setState(() => ({
      [key]: value
    }))
  }

  onSubmit = (refetch) => {
    const { name, age, gender } = this.state
    let errors = []

    if (name.trim() === '') {
      errors.push('Enter a name')
    }

    if (age.trim() === '' && !/^\d+$/.test(age)) {
      errors.push('Inform a valid age')
    }

    if (gender.trim() === '' && !/^[MF]$/.test(gender)) {
      errors.push('Select a gender')
    }

    if (errors.length === 0) {
      this.setState(() => ({ loading: true }))
      api.postPerson(this.state).then(({data}) => {
        this.setState(() => ({
          personId: data.id,
        }))
      })
    }

    this.setState((prevState) => ({
      errors,
      step: errors.length > 0 ? PERSONAL_INFORMATION_STEP : prevState.step
    }))
  }

  onNext = (refetch) => () => {
    const { step } = this.state

    if (step === PERSONAL_INFORMATION_STEP) {
      this.setState(() => ({
        step: LOCATION_STEP
      }))
    } else if (step === LOCATION_STEP) {
      this.setState(() => ({
        step: INVENTORY_STEP
      }))
    } else {
      this.onSubmit(refetch)
    }
  }

  onBack = () => {
    const { step } = this.state

    if (step === INVENTORY_STEP) {
      this.setState(() => ({
        step: LOCATION_STEP
      }))
    } else if (step === LOCATION_STEP) {
      this.setState(() => ({
        step: PERSONAL_INFORMATION_STEP
      }))
    }
  }

  renderSteps() {
    const { step } = this.state

    return (
      <Step.Group widths={3}>
        <Step active={step === PERSONAL_INFORMATION_STEP}>
          <Icon name="user" />
          <Step.Content>
            <Step.Title>Personal Information</Step.Title>
          </Step.Content>
        </Step>

        <Step active={step === LOCATION_STEP} disabled={step === PERSONAL_INFORMATION_STEP}>
          <Icon name="map marker alternate" />
          <Step.Content>
            <Step.Title>Location</Step.Title>
          </Step.Content>
        </Step>

        <Step active={step === INVENTORY_STEP} disabled={step !== INVENTORY_STEP}>
          <Icon name="box" />
          <Step.Content>
            <Step.Title>Inventory</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    )
  }

  renderCurrentStep() {
    const { step } = this.state

    if (step === LOCATION_STEP) {
      return (
        <LocationStep location={this.state.lonlat} onLocationChange={this.onValueChange('lonlat')} />
      )
    }

    if (step === INVENTORY_STEP) {
      return <InventoryStep items={this.state.items} onChange={this.onValueChange('items')} />
    }

    return (
      <PersonalInformationStep
        name={this.state.name}
        age={this.state.age}
        gender={this.state.gender}
        onNameChange={this.onInputChange('name')}
        onAgeChange={this.onInputChange('age')}
        onGenderChange={this.onDropdownChange('gender')} />
    )
  }

  render() {
    const { personId, step, errors, loading } = this.state

    if (personId) {
      return <Redirect to={`/dashboard/${personId}`} />
    }

    return (
      <Container>
        <PeopleContext.Consumer>
          {({refetch}) => (
            <Panel>
              <h1>Register new survivor</h1>

              {this.renderSteps()}

              {errors.length > 0 && <Message negative header='Please, correct the error(s) below' list={errors} />}

              {this.renderCurrentStep()}

              <ActionSection>
                {step === PERSONAL_INFORMATION_STEP
                    ? <Link to="/welcome" className="ui button">Cancel</Link>
                    : <Button onClick={this.onBack}>Back</Button>
                }
                <Button primary loading={loading} onClick={this.onNext(refetch)}>
                  {step === INVENTORY_STEP ? 'Register' : 'Next'}
                </Button>
              </ActionSection>
            </Panel>
          )}
        </PeopleContext.Consumer>
      </Container>
    )
  }
}
