import React from 'react'
import { Icon, Label, Header, Segment, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

import * as inventoryUtils from 'utils/inventoryUtils'

const Container = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
`

const Item = ({name, value}) => (
  <section>
    <Popup content={inventoryUtils.ITEMS_NAME[name]} position="bottom left" trigger={(
    <Segment compact>
      <Header icon style={{margin: 0}}>
        <Label color='red' floating>
          {value}
        </Label>
        <Icon name={inventoryUtils.ITEMS_ICON[name]} style={{margin: '0 auto'}} />
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
        <Item name="water" value={items.water || 0} />
        <Item name="food" value={items.food || 0} />
        <Item name="medication" value={items.medication || 0} />
        <Item name="ammunition" value={items.ammunition || 0} />
      </Container>
    </section>
  )
}

export default InventorySection
