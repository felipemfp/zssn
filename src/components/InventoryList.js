import React from 'react'
import { List } from 'semantic-ui-react'

import { ITEMS_NAME, ITEMS_ICON, ITEMS_POINT } from 'utils/inventoryUtils'

import InventoryItem from './InventoryItem'

const InventoryList = ({items, onWaterChange, onFoodChange, onMedicationChange, onAmmunitionChange, inventory=null, size='large'}) => {
  const renderItem = (key, onChange) => (
    <InventoryItem
      icon={ITEMS_ICON[key]}
      header={ITEMS_NAME[key]}
      description={`${ITEMS_POINT[key]} point${ITEMS_POINT[key] > 1 ? 's' : ''}`}
      quantity={inventory ? inventory[key] : false}
      value={items[key]}
      onChange={onChange}
    />
  )

  return (
    <List divided relaxed size={size}>
      {renderItem('water', onWaterChange)}
      {renderItem('food', onFoodChange)}
      {renderItem('medication', onMedicationChange)}
      {renderItem('ammunition', onAmmunitionChange)}
    </List>
  )
}

export default InventoryList
