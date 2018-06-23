import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

import FlagAnInfectedModal from './modals/FlagAnInfectedModal'

const ActionsSection = ({survivor}) => {
  return (
    <section>
      <h3>Actions</h3>

      <Button icon labelPosition='left'>
        <Icon name="exchange" />
        Trade items
      </Button>

      <FlagAnInfectedModal survivor={survivor} render={
        (onClick) => (
          <Button icon labelPosition='left' onClick={onClick}>
            <Icon name="flag" />
            Flag an infected
          </Button>
        )
      }/>
    </section>
  )
}

export default ActionsSection
