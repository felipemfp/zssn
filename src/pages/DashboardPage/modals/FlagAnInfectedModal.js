import React, { Component } from 'react'
import { Modal, Button, Header, Dropdown } from 'semantic-ui-react'
import { PeopleContext } from 'contexts'
import { toast } from 'react-toastify'
import * as api from 'api'

export default class FlagAnInfectedModal extends Component {
  state = {
    open: false,
    infectedId: null
  }

  handleChange = (evt, {value}) => {
    this.setState(() => ({
      infectedId: value
    }))
  }

  onSubmit = (refetch) => (evt) => {
    const { infectedId } = this.state
    const { survivor } = this.props

    api.postInfectionReport({
      survivorId: survivor.id,
      infectedId
    }).then(() => {
      toast.success('Infection successfully reported.')
      refetch()
      this.handleClose()
    })
  }

  onCancel = () => this.setState(() => ({
    open: false,
    survivorId: null
  }))

  handleOpen = () => this.setState(() => ({ open: true }))

  handleClose = () => this.setState(() => ({ open: false }))

  render() {
    const { render } = this.props
    const { infectedId, open } = this.state

    return (
      <PeopleContext.Consumer>
        {({people, healthy, refetch}) => (
          <Modal trigger={render(this.handleOpen)} size="mini" closeIcon open={open} onClose={this.handleClose}>
            <Modal.Header>Flag an infected</Modal.Header>
            <Modal.Content>
              <Dropdown
                className="big"
                placeholder="Select a survivor"
                fluid
                search
                selection
                loading={people.length === 0}
                options={healthy.map(idx => ({
                  key: people[idx].id,
                  text: people[idx].name,
                  value: people[idx].id,
                  content: <Header content={people[idx].name} subheader={`${people[idx].age} years old`} />
                }))}
                value={infectedId}
                onChange={this.handleChange}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.onCancel}>Cancel</Button>
              <Button disabled={!infectedId} positive icon="checkmark" labelPosition="right" content="Flag" onClick={this.onSubmit(refetch)} />
            </Modal.Actions>
          </Modal>
        )}
      </PeopleContext.Consumer>
    )
  }
}
