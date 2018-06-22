import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import AppContainer from 'containers/AppContainer'

import WelcomePage from 'pages/WelcomePage'
import RegisterPage from 'pages/RegisterPage'
import DashboardPage from 'pages/DashboardPage'

class Root extends Component {
  render() {
    return (
      <Router>
        <AppContainer>
          <Switch>
            <Route path="/welcome" component={WelcomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/dashboard/:survivorId" component={DashboardPage} />
            <Redirect to="/welcome" />
          </Switch>
        </AppContainer>
      </Router>
    )
  }
}

export default Root
