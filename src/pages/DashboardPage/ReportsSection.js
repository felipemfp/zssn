import React, { Component } from 'react'
import { Statistic, Loader, Popup } from 'semantic-ui-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import * as api from 'api'

export default class ReportsSection extends Component {

  state = {
    loading: true
  }

  fetchReports = () => {
    Promise.all([
      api.getReportAboutInfectedPoints(),
      api.getReportAboutPeopleInventory(),
      api.getReportAboutInfected()
    ]).then(([
      {data: { report: infectedPointsReport }},
      {data: { report: peopleInventoryReport }},
      {data: { report: infectedReport }}
    ]) => {
      this.setState(() => ({
        loading: false,
        infectedReport,
        peopleInventoryReport,
        infectedPointsReport
      }))
    })
  }

  componentDidMount = () => {
    this.fetchReports()
  }

  renderContent = () => {
    const {
      infectedReport,
      peopleInventoryReport,
      infectedPointsReport
    } = this.state

    const infected = Math.round(infectedReport['average_infected'] * 10000) / 100
    const chartData = [
      {name: 'Healthy', value: 100 - infected},
      {name: 'Infected', value: infected}
    ]

    return (
      <React.Fragment>
        <div style={{height: '15rem', marginBottom: '1rem'}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={chartData} label={({value}) => `${value}%`} isAnimationActive={false}>
                <Cell key={`cell-0`} fill="#21ba45" />
                <Cell key={`cell-1`} fill="#db2828" />
              </Pie>
              <Legend layout="horizontal" verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Statistic.Group size="small" widths="two">
          <Popup content={infectedPointsReport['description']} basic trigger={
            <Statistic color='red' label='Points lost' value={infectedPointsReport['total_points_lost']} />
          }/>
          <Popup content={peopleInventoryReport['description']} basic trigger={
            <Statistic label='Items per survivor' value={Math.round(peopleInventoryReport['average_items_quantity_per_healthy_person'])} />
          } />
        </Statistic.Group>
      </React.Fragment>
    )
  }

  renderLoading = () => (
    <Loader active inline='centered'/>
  )

  render() {
    const { loading } = this.state

    return (
      <section>
        <h3>Reports</h3>

        {loading
          ? this.renderLoading()
          : this.renderContent()
        }
      </section>
    )
  }
}
