import React, { Component } from 'react'

import * as inventoryUtils from 'utils/inventoryUtils'

import InventoryList from 'components/InventoryList'

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
      <InventoryList
        items={this.state}
        onWaterChange={this.onChange('water')}
        onFoodChange={this.onChange('food')}
        onMedicationChange={this.onChange('medication')}
        onAmmunitionChange={this.onChange('ammunition')}
      />
    )
  }
}
