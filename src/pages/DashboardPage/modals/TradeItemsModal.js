import React, { Component } from 'react'
import { Modal, Button, Header, Dropdown, Grid, Segment, List, Input, Icon, Divider } from 'semantic-ui-react'
import { PeopleContext } from 'contexts'
import { toast } from 'react-toastify'
import * as api from 'api'
import * as inventoryUtils from 'utils/inventoryUtils'

const Item = ({quantity, value, onChange, icon, header, description}) => (
  <List.Item>
    <List.Content floated="right" style={{width: '50%'}}>
      <Input disabled={quantity === 0} value={value} onChange={onChange} fluid type="number" label={`/${quantity === undefined ? '-' : quantity}`} labelPosition="right" />
    </List.Content>
    <List.Icon name={icon} size="large" verticalAlign="middle" />
    <List.Content>
      <List.Header>{header}</List.Header>
      <List.Description>{description}</List.Description>
    </List.Content>
  </List.Item>
)

const Inventory = ({title, subtitle, items, inventory, onChange, valid, loading=false}) => (
  <React.Fragment>
    <Header content={title} subheader={subtitle} />
    <Segment attached loading={loading} color={valid ? 'green' : 'red'}>
      <List divided relaxed size="large">
        <Item icon="tint" header="Water" description="4 points" value={items.water} onChange={onChange("water")} quantity={inventory && inventory.water} />
        <Item icon="food" header="Food" description="3 points" value={items.food} onChange={onChange("food")} quantity={inventory && inventory.food} />
        <Item icon="medkit" header="Medication" description="2 points" value={items.medication} onChange={onChange("medication")} quantity={inventory && inventory.medication} />
        <Item icon="crosshairs" header="Ammunition" description="1 point" value={items.ammunition} onChange={onChange("ammunition")} quantity={inventory && inventory.ammunition} />
      </List>
    </Segment>
  </React.Fragment>
)

const initialState = {
  open: false,
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
  }
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
      const inventory = data.reduce((items, property) => {
        items[property.item.name.toLowerCase()] = property.quantity
        return items
      }, {
        water: 0,
        food: 0,
        medication: 0,
        ammunition: 0
      })

      this.setState(() => ({
        loading: false,
        recipientInventory: inventory
      }))
    })
  }

  handleChange = (evt, {value}) => {
    this.setState(() => ({
      recipientId: value,
      paymentItems: initialState.paymentItems
    }), this.fetchInventory)
  }

  validate = () => {
    const { inventory } = this.props
    const { pickItems, paymentItems, recipientInventory } = this.state

    const validateInventory = (inventory, items) =>
      Object.keys(inventory)
        .reduce((valid, key) => items[key] < inventory[key] && valid, true)

    const hasSamePoints = inventoryUtils.calculatePoints(pickItems) === inventoryUtils.calculatePoints(paymentItems)
    const pickHasValidValues = validateInventory(inventory, pickItems)
    const paymentHasValidValues = validateInventory(recipientInventory, paymentItems)

    this.setState(() => ({
      valid: hasSamePoints && pickHasValidValues && paymentHasValidValues
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
    const { valid, recipientId, open, opening, loading, paymentItems, pickItems, recipientInventory } = this.state

    return (
      <PeopleContext.Consumer>
        {({people, healthy}) => (
          <Modal trigger={render(this.handleOpen)} closeIcon open={open} onClose={this.handleClose}>
            <Modal.Header>Trade items</Modal.Header>
            <Modal.Content>
              <Grid columns="2">
                <Grid.Column width="16">
                  <Header content="Recipient" subheader="Who are you trading with?" />
                  <Dropdown
                    className="large"
                    placeholder="Select a recipient"
                    fluid
                    search
                    selection
                    loading={opening || people.length === 0}
                    options={opening ? [] : healthy.filter(idx => people[idx].id !== survivor.id).map(idx => ({
                      key: people[idx].id,
                      text: people[idx].name,
                      value: people[idx].id,
                      content: <Header content={people[idx].name} subheader={`${people[idx].age} years old`} />
                    }))}
                    value={recipientId}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Inventory
                    valid={valid}
                    items={pickItems}
                    title="Wanted items"
                    subtitle="What the recipient wants?"
                    onChange={this.onChange("pickItems")}
                    inventory={inventory}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Inventory
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
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleClose}>Cancel</Button>
              <Button disabled={!valid} positive icon="checkmark" labelPosition="right" content="Trade" onClick={this.onSubmit(people)} />
            </Modal.Actions>
          </Modal>
        )}
      </PeopleContext.Consumer>
    )
  }
}
