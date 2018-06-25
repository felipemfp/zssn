import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import { PeopleContext } from 'contexts'

import * as api from 'api'

import PersonSelect from 'components/PersonSelect'

export default class FlagAnInfectedModal extends Component {
  state = {
    open: false,
    opening: false,
    loading: false,
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

    this.setState(() => ({loading: true}))
    api.postInfectionReport({
      survivorId: survivor.id,
      infectedId
    }).then(() => {
      toast.success('Infection successfully reported.')
      refetch()
      this.handleClose()
    })
  }

  handleOpen = () => this.setState(() => ({
    open: true,
    opening: true
  }), () => {
    setTimeout(() => this.setState(() => ({ opening: false })), 300)
  })

  handleClose = () => this.setState(() => ({
    open: false,
    infectedId: null
  }))

  render() {
    const { render } = this.props
    const { infectedId, open, opening, loading } = this.state

    return (
      <PeopleContext.Consumer>
        {({people, healthy, refetch}) => (
          <Modal trigger={render(this.handleOpen)} size="mini" closeIcon open={open} onClose={this.handleClose}>
            <Modal.Header>Flag an infected</Modal.Header>
            <Modal.Content>
              <PersonSelect
                size="big"
                placeholder="Select a survivor"
                loading={opening || people.length === 0}
                people={opening ? [] : healthy.map(idx => people[idx])}
                value={infectedId}
                onChange={this.handleChange}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleClose}>Cancel</Button>
              <Button loading={loading} disabled={!infectedId} positive icon="checkmark" labelPosition="right" content="Flag" onClick={this.onSubmit(refetch)} />
            </Modal.Actions>
          </Modal>
        )}
      </PeopleContext.Consumer>
    )
  }
}
