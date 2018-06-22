import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

const ActionsSection = () => {
  return (
    <section>
      <h3>Actions</h3>
      <Button icon labelPosition='left'>
        <Icon name="exchange" />
        Trade items
      </Button>
      <Button icon labelPosition='left'>
        <Icon name="flag" />
        Flag an infected
      </Button>
    </section>
  )
}

export default ActionsSection
