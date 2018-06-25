import React, { Component } from 'react'
import styled from 'styled-components'
import { Marker, InfoWindow } from 'react-google-maps'
import { ToastContainer, toast } from 'react-toastify'
import * as lonlatUtils from 'utils/lonlatUtils'
import * as inventoryUtils from 'utils/inventoryUtils'
import * as api from 'api'

import { PeopleContext } from 'contexts'

import GoogleMap from 'components/GoogleMap'
import PersonMarker from 'components/PersonMarker'

import { Loader, Icon, Header, Divider, Button } from 'semantic-ui-react'

import InventorySection from './InventorySection'
import ActionsSection from './ActionsSection'
import ReportsSection from './ReportsSection'
import ExitButton from 'components/ExitButton'

import { INITIAL_LAT_LNG } from 'utils/constants'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Panel = styled.section`
  width: 40rem;
  padding: 1rem;
  overflow-y: auto;
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
        const inventory = inventoryUtils.parseProperties(properties)

        this.setState(() => ({
          loading: false,
          survivor: person,
          inventory
        }))
      })
  }

  refetchProperties = () => {
    const { survivor } = this.state
    api.getPersonProperties(survivor.id).then(({data}) => {
      const inventory = inventoryUtils.parseProperties(data)
      this.setState(() => ({ inventory }))
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

    const { survivor, inventory, openInfoWindow } = this.state

    const position = survivor.lonlat
      ? lonlatUtils.fromString(survivor.lonlat)
      : INITIAL_LAT_LNG()

    const defaultZoom = survivor.lonlat
      ? 15
      : 10

    return (
      <PeopleContext.Consumer>
        {({people, refetch}) => (
          <Container>
            <ToastContainer autoClose={3000} />
            <Panel>
              <Header as="h2">
                <ExitButton onClick={refetch} render={(onClick) => (
                  <Button floated="right" basic onClick={onClick}><Icon name="power off" />Logout</Button>
                )} />
                {survivor.name}
                <Header.Subheader>{`${survivor.age} years old`}</Header.Subheader>
              </Header>
              <Divider />
              <InventorySection items={inventory} />
              <Divider />
              <ActionsSection
                refetch={this.refetchProperties}
                survivor={survivor}
                inventory={inventory}
              />
              <Divider />
              <ReportsSection />
            </Panel>
            <MapContainer>
              <GoogleMap defaultCenter={position} defaultZoom={defaultZoom}>
                <Marker defaultPosition={position} draggable={true} onDragEnd={this.handleDragEnd}>
                  <InfoWindow>
                    <span>Drag to update current location</span>
                  </InfoWindow>
                </Marker>

                {people.map(person => (person.id !== survivor.id && person.lonlat) && (
                  <PersonMarker
                    key={person.id}
                    person={person}
                    infected={person.isInfected}
                    position={lonlatUtils.fromString(person.lonlat)}
                    infoWindowOpen={openInfoWindow[person.id]}
                    onToggle={this.handleToggleInfoWindow(person.id)}
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
