import React from 'react'
import { List } from 'semantic-ui-react'

import InventoryItem from './InventoryItem'

const InventoryList = ({items, onWaterChange, onFoodChange, onMedicationChange, onAmmunitionChange, inventory=null, size='large'}) => {
  return (
    <List divided relaxed size={size}>
      <InventoryItem
        icon="tint"
        header="Water"
        description="4 points"
        quantity={inventory ? inventory.water : false}
        value={items.water}
        onChange={onWaterChange}
      />
      <InventoryItem
        icon="food"
        header="Food"
        description="3 points"
        quantity={inventory ? inventory.food : false}
        value={items.food}
        onChange={onFoodChange}
      />
      <InventoryItem
        icon="medkit"
        header="Medication"
        description="2 points"
        quantity={inventory ? inventory.medication : false}
        value={items.medication}
        onChange={onMedicationChange}
      />
      <InventoryItem
        icon="crosshairs"
        header="Ammunition"
        description="1 point"
        quantity={inventory ? inventory.ammunition : false}
        value={items.ammunition}
        onChange={onAmmunitionChange}
      />
    </List>
  )
}

export default InventoryList
