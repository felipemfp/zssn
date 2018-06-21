import React, { Component } from 'react'

import * as api from 'api'

import { PeopleContext } from 'contexts'

export default class AppContainer extends Component {
  state = {
    people: [],
    healthy: [],
    infected: []
  }

  componentDidMount = () => {
    api.getPeople().then(({ data }) => {
      const people = data.map(person => ({
        ...person,
        isInfected: person['infected?'] === true,
        id: person.location.split('/').pop()
      }))

      const { healthy, infected } = people.reduce((aggr, person, idx) => {
        if (person.isInfected) {
          aggr.infected.push(idx)
        } else {
          aggr.healthy.push(idx)
        }
        return aggr
      }, {
        healthy: [],
        infected: []
      })

      this.setState(() => ({
        people, healthy, infected
      }))
    })
  }

  render() {
    const { people, healthy, infected } = this.state

    return (
      <PeopleContext.Provider value={{people, healthy, infected}}>
        {this.props.children}
      </PeopleContext.Provider>
    )
  }
}
