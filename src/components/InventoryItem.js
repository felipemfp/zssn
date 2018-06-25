import React from 'react'
import { List, Input } from 'semantic-ui-react'

const InventoryItem = ({value, onChange, icon, header, description, quantity=false}) => (
  <List.Item>
    <List.Content floated="right" style={{ width: '40%' }}>
      <Input
        disabled={quantity === false ? false : quantity === 0 }
        value={value}
        onChange={onChange}
        fluid
        type="number"
        label={quantity === false ? false : `/${quantity === undefined ? '-' : quantity}`}
        labelPosition={quantity === false ? null : 'right'}
      />
    </List.Content>
    <List.Icon name={icon} size="large" verticalAlign="middle" />
    <List.Content>
      <List.Header>{header}</List.Header>
      <List.Description>{description}</List.Description>
    </List.Content>
  </List.Item>
)

export default InventoryItem
