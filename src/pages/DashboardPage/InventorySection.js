import React from 'react'
import { Icon, Label, Header, Segment, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

import * as inventoryUtils from 'utils/inventoryUtils'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

const Item = ({icon, name, value}) => (
  <section>
    <Popup content={name} position="bottom left" trigger={(
    <Segment compact>
      <Header icon style={{margin: 0}}>
        <Label color='red' floating>
          {value}
        </Label>
        <Icon name={icon} style={{margin: '0 auto'}} />
      </Header>
    </Segment>
    )}/>
  </section>
)

const InventorySection = ({items}) => {
  return (
    <section>
      <h3>
        <Label style={{float: 'right'}}>
          Points
          <Label.Detail>{inventoryUtils.calculatePoints(items)}</Label.Detail>
        </Label>
        Inventory
      </h3>

      <Container>
        <Item icon="tint" name="Water" value={items.water || 0} />
        <Item icon="food" name="Food" value={items.food || 0} />
        <Item icon="medkit" name="Medication" value={items.medication || 0} />
        <Item icon="crosshairs" name="Ammunition" value={items.ammunition || 0} />
      </Container>
    </section>
  )
}

export default InventorySection
