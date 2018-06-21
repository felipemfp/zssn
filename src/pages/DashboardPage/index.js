import React, { Component } from 'react'

export default class DashboardPage extends Component {
  render() {
    const { match: { params: { survivorId }} } = this.props

    return (
      <div>
        <h1>{survivorId}'s Dashboard</h1>
      </div>
    )
  }
}
