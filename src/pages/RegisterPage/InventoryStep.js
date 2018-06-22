import React, { Component } from 'react'
import  { List, Input } from 'semantic-ui-react'
import * as inventoryUtils from 'utils/inventoryUtils'

const Item = (props) => (
  <List.Item>
    <List.Content floated="right">
      <Input value={props.value} onChange={props.onChange} type="number" size="large" />
    </List.Content>
    <List.Icon name={props.icon} size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header>{props.header}</List.Header>
      <List.Description>{props.description}</List.Description>
    </List.Content>
  </List.Item>
)

export default class InventoryStep extends Component {
  state = {
    ...inventoryUtils.fromString(this.props.items)
  }

  onChange = (key) => (evt) => {
    const value = evt.target.value
    this.setState(() => ({
      [key]: value
    }), () => {
      this.props.onChange(inventoryUtils.toString(this.state))
    })
  }

  render() {
    return (
      <List divided relaxed size="large">
        <Item icon="tint" header="Water" description="4 points" value={this.state.water} onChange={this.onChange("water")} />
        <Item icon="food" header="Food" description="3 points" value={this.state.food} onChange={this.onChange("food")} />
        <Item icon="medkit" header="Medication" description="2 points" value={this.state.medication} onChange={this.onChange("medication")} />
        <Item icon="crosshairs" header="Ammunition" description="1 point" value={this.state.ammunition} onChange={this.onChange("ammunition")} />
      </List>
    )
  }
}
