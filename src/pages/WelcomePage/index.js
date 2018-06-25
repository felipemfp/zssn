import React, { Component } from 'react'
import styled from 'styled-components'
import { Dropdown, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PublicLayout from 'containers/PublicLayout'
import { PeopleContext } from 'contexts'
import PersonSelect from 'components/PersonSelect'

export default class WelcomePage extends Component {
  state = {}

  handleChange = (evt, {value}) => {
    this.setState(() => ({
      survivorId: value
    }))
  }

  render() {
    const { survivorId } = this.state

    return (
      <PublicLayout>
        <h1>Welcome back!</h1>

        <PeopleContext.Consumer>
          {({healthy, people}) => (
            <PersonSelect
              placeholder="Who you are?"
              loading={people.length === 0}
              people={healthy.map(idx => people[idx])}
              value={survivorId}
              size="massive"
              onChange={this.handleChange}
            />
          )}
        </PeopleContext.Consumer>

        <PublicLayout.Footer>
          <Link to="/register" className="ui big button">Not listed?</Link>
          <Link to={`/dashboard/${survivorId}`} className={`ui big primary button ${!survivorId && 'disabled'}`}>Enter</Link>
        </PublicLayout.Footer>
      </PublicLayout>
    )
  }
}
