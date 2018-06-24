import React, { Component } from 'react'
import styled from 'styled-components'
import { Segment, Dropdown, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { PeopleContext } from 'contexts'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
`

const Panel = styled(Segment)`
  padding: 2rem !important;
  width: 30rem;
`

const ActionSection = styled.section`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`

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

          <ActionSection>
            <Link to="/register" className="ui big button">Not listed?</Link>
            <Link to={`/dashboard/${survivorId}`} className={`ui big primary button ${!survivorId && 'disabled'}`}>Enter</Link>
          </ActionSection>
        </Panel>
      </Container>
    )
  }
}
