import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

import FlagAnInfectedModal from './modals/FlagAnInfectedModal'
import TradeItemsModal from './modals/TradeItemsModal'

const ActionsSection = ({survivor, inventory, refetch}) => {
  return (
    <section>
      <h3>Actions</h3>

      <TradeItemsModal refetch={refetch} survivor={survivor} inventory={inventory} render={
        (onClick) => (
          <Button icon labelPosition="left" onClick={onClick}>
            <Icon name="exchange" />
            Trade items
          </Button>
        )
      } />

      <FlagAnInfectedModal survivor={survivor} render={
        (onClick) => (
          <Button icon labelPosition="left" onClick={onClick}>
            <Icon name="flag" />
            Flag an infected
          </Button>
        )
      }/>
    </section>
  )
}

export default ActionsSection
