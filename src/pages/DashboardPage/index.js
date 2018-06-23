import React, { Component } from 'react'
import styled from 'styled-components'
import { Marker, InfoWindow } from 'react-google-maps'
import { ToastContainer, toast } from 'react-toastify'
import * as lonlatUtils from 'utils/lonlatUtils'
import * as api from 'api'
import { Link } from 'react-router-dom'

import { PeopleContext } from 'contexts'

import GoogleMap from 'components/GoogleMap'
import PersonMarker from 'components/PersonMarker'

import { Loader, Icon, Header, Divider } from 'semantic-ui-react'

import InventorySection from './InventorySection'
import ActionsSection from './ActionsSection'
import ReportsSection from './ReportsSection'

import { NATAL_LAT_LNG } from 'utils/constants'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Panel = styled.section`
  width: 40rem;
  padding: 1rem;
`

const MapContainer = styled.section`
  height: 100%;
  width: 100%;
`

export default class DashboardPage extends Component {

  state = {
    loading: true,
    openInfoWindow: {}
  }

  fetchSurvivor = () => {
    const { match: { params: { survivorId }} } = this.props

    this.setState(() => ({ loading: true }))
    Promise.all([api.getPerson(survivorId), api.getPersonProperties(survivorId)])
      .then(([{data: person}, {data: properties}]) => {
        const inventory = properties.reduce((items, property) => {
          items[property.item.name.toLowerCase()] = property.quantity
          return items
        }, {
          water: 0,
          food: 0,
          medication: 0,
          ammunition: 0
        })

        this.setState(() => ({
          loading: false,
          survivor: person,
          inventory
        }))
      })
  }

  handleDragEnd = ({latLng}) => {
    const lat = latLng.lat()
    const lng = latLng.lng()

    const lonlat = lonlatUtils.toString({lat, lng})

    this.setState(({survivor}) => ({
      survivor: {
        ...survivor,
        lonlat
      }
    }), () => {
      const { survivor } = this.state

      api.patchPerson(survivor.id, survivor).then(response => {
        toast.success('Current location successfully updated.')
      })
    })
  }

  handleToggleInfoWindow = (key) => () => {
    this.setState(({openInfoWindow}) => ({
      openInfoWindow: {
        ...openInfoWindow,
        [key]: !openInfoWindow[key]
      }
    }))
  }

  componentDidMount = () => {
    this.fetchSurvivor()
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return (
        <Loader active size="massive" />
      )
    }

    const { survivor, openInfoWindow } = this.state

    const position = survivor.lonlat
      ? lonlatUtils.fromString(survivor.lonlat)
      : NATAL_LAT_LNG

    const defaultZoom = survivor.lonlat
      ? 15
      : 10

    return (
      <PeopleContext.Consumer>
        {({people, healthy, infected}) => (
          <Container>
            <ToastContainer autoClose={3000} />
            <Panel>
              <Header as="h2">
                <Link className="ui right floated button" to="/"><Icon name="power off" />Exit</Link>
                {survivor.name}
                <Header.Subheader>{`${survivor.age} years old`}</Header.Subheader>
              </Header>
              <Divider />
              <InventorySection items={this.state.inventory} />
              <Divider />
              <ActionsSection />
              <Divider />
              <ReportsSection />
            </Panel>
            <MapContainer>
              <GoogleMap defaultCenter={position} defaultZoom={defaultZoom}>
                <Marker defaultPosition={position} draggable={true} onDragEnd={this.handleDragEnd}>
                  <InfoWindow><span>Drag to update current location</span></InfoWindow>
                </Marker>

                {healthy.map(idx => (people[idx].id !== survivor.id && people[idx].lonlat) && (
                  <PersonMarker
                    key={idx}
                    person={people[idx]}
                    position={lonlatUtils.fromString(people[idx].lonlat)}
                    infoWindowOpen={openInfoWindow[people[idx].id]}
                    onToggle={this.handleToggleInfoWindow(people[idx].id)}
                  />
                ))}

                {infected.map(idx => people[idx].lonlat && (
                  <PersonMarker
                    key={idx}
                    person={people[idx]}
                    position={lonlatUtils.fromString(people[idx].lonlat)}
                    infected={true}
                    infoWindowOpen={openInfoWindow[people[idx].id]}
                    onToggle={this.handleToggleInfoWindow(people[idx].id)}
                  />
                ))}
              </GoogleMap>
            </MapContainer>
          </Container>
        )}
      </PeopleContext.Consumer>
    )
  }
}
