import React, { Component } from 'react'
import styled from 'styled-components'
import { Segment, Dropdown, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { PeopleContext } from 'contexts'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
`

const Panel = styled(Segment)`
  padding: 2rem !important;
  width: 30rem;
`

export default class WelcomePage extends Component {
  state = {}

  handleChange = (evt, {value}) => {
    evt.stopPropagation()

    this.setState(() => ({
      survivorId: value
    }))
  }

  render() {
    const { survivorId } = this.state

    if (survivorId) {
      return <Redirect push={true} to={`/dashboard/${survivorId}`} />
    }

    return (
      <Container>
        <Panel>
          <h1>Welcome back!</h1>

          <PeopleContext.Consumer>
            {({healthy, people}) => (
              <Dropdown
                className="massive"
                placeholder="Who you are?"
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
                onChange={this.handleChange}
              />
            )}
          </PeopleContext.Consumer>
        </Panel>
      </Container>
    )
  }
}
