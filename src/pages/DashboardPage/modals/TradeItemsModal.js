import React, { Component } from 'react'
import { Modal, Button, Header, Grid, Segment, Message, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import * as api from 'api'
import * as inventoryUtils from 'utils/inventoryUtils'

import { PeopleContext } from 'contexts'

import InventoryList from 'components/InventoryList'
import PersonSelect from 'components/PersonSelect'


const InventorySection = ({title, subtitle, items, inventory, onChange, valid, loading=false}) => (
  <React.Fragment>
    <Header>
      <Label color={valid ? 'green' : 'red'} style={{float: 'right'}}>
        Points
        <Label.Detail>{inventoryUtils.calculatePoints(items)}</Label.Detail>
      </Label>
      {title}
      <Header.Subheader>{subtitle}</Header.Subheader>
    </Header>
    <Segment attached loading={loading} color={valid ? 'green' : 'red'}>
      <InventoryList
        inventory={inventory}
        items={items}
        onWaterChange={onChange('water')}
        onFoodChange={onChange('food')}
        onMedicationChange={onChange('medication')}
        onAmmunitionChange={onChange('ammunition')}
      />
    </Segment>
  </React.Fragment>
)

const initialState = {
  open: false,
  working: false,
  opening: false,
  loading: false,
  recipientId: null,
  recipientInventory: {},
  valid: false,
  pickItems: {
    water: 0,
    food: 0,
    ammunition: 0,
    medication: 0
  },
  paymentItems: {
    water: 0,
    food: 0,
    ammunition: 0,
    medication: 0
  },
  errors: []
}
export default class TradeItemsModal extends Component {
  state = {
    ...initialState
  }

  fetchInventory = () => {
    const { recipientId } = this.state

    this.setState(() => ({
      loading: true
    }))

    api.getPersonProperties(recipientId).then(({data}) => {
      const inventory = inventoryUtils.parseProperties(data)

      this.setState(() => ({
        loading: false,
        recipientInventory: inventory
      }))
    })
  }

  validate = () => {
    const { inventory } = this.props
    const { pickItems, paymentItems, recipientInventory } = this.state
    const errors = []

    const validateInventory = (inventory, items) =>
      Object.keys(inventory)
        .reduce((valid, key) => (inventory[key] === 0 || items[key] < inventory[key]) && valid, true)

    const hasSamePoints = inventoryUtils.calculatePoints(pickItems) === inventoryUtils.calculatePoints(paymentItems)
    const pickHasValidValues = validateInventory(inventory, pickItems)
    const paymentHasValidValues = validateInventory(recipientInventory, paymentItems)

    if (!hasSamePoints) {
      errors.push('A transaction can only go through if the points of the traded items are the same')
    }

    if (!pickHasValidValues || !paymentHasValidValues) {
      errors.push('A transaction can not empty a resource of any of the participants.')
    }

    this.setState(() => ({
      valid: hasSamePoints && pickHasValidValues && paymentHasValidValues,
      errors
    }))
  }

  onChange = (key) => (item) => (evt) => {
    const value = evt.target.value
    this.setState((prevState) => ({
      [key]: {
        ...prevState[key],
        [item]: value
      }
    }), this.validate)
  }

  onSubmit = (people) => (evt) => {
    const { pickItems, paymentItems, recipientId } = this.state
    const { survivor, refetch } = this.props

    const recipient = people.find(person => person.id === recipientId)

    this.setState(() => ({ working: true }))
    api.postTrade(survivor.id, {
      name: recipient.name,
      pick: inventoryUtils.toString(pickItems, true),
      payment: inventoryUtils.toString(paymentItems, true)
    }).then(() => {
      toast.success('Transaction successfully completed..')
      refetch()
      this.handleClose()
    })
  }

  handleChange = (evt, {value}) => {
    this.setState(() => ({
      recipientId: value,
      paymentItems: initialState.paymentItems
    }), this.fetchInventory)
  }

  handleOpen = () => this.setState(() => ({
    open: true,
    opening: true
  }), () => {
    setTimeout(() => this.setState(() => ({ opening: false })), 300)
  })

  handleClose = () => this.setState(() => ({
    ...initialState
  }))

  render() {
    const { render, survivor, inventory } = this.props
    const { working, errors, valid, recipientId, open, opening, loading, paymentItems, pickItems, recipientInventory } = this.state

    return (
      <PeopleContext.Consumer>
        {({people, healthy}) => (
          <Modal trigger={render(this.handleOpen)} closeIcon open={open} onClose={this.handleClose}>
            <Modal.Header>Trade items</Modal.Header>
            <Modal.Content>
              <Grid columns="2" stackable>
                <Grid.Column width="16">
                  <Header content="Recipient" subheader="Who are you trading with?" />
                  <PersonSelect
                    size="large"
                    placeholder="Select a recipient"
                    loading={opening || people.length === 0}
                    people={opening ? [] : healthy.filter(idx => people[idx].id !== survivor.id).map(idx => people[idx])}
                    value={recipientId}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <InventorySection
                    valid={valid}
                    items={pickItems}
                    title="Wanted items"
                    subtitle="What the recipient wants?"
                    onChange={this.onChange("pickItems")}
                    inventory={inventory}
                  />
                </Grid.Column>
                <Grid.Column>
                  <InventorySection
                    valid={valid}
                    loading={loading}
                    items={paymentItems}
                    title="Payment items"
                    subtitle="What is the recipient paying in return?"
                    onChange={this.onChange("paymentItems")}
                    inventory={recipientInventory}
                  />
                </Grid.Column>
              </Grid>
              {errors.length > 0 && <Message negative header="Transaction observations" list={errors} />}
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleClose}>Cancel</Button>
              <Button disabled={!valid} loading={working} positive icon="checkmark" labelPosition="right" content="Trade" onClick={this.onSubmit(people)} />
            </Modal.Actions>
          </Modal>
        )}
      </PeopleContext.Consumer>
    )
  }
}
