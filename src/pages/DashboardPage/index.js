import React, { Component } from 'react'
import styled from 'styled-components'
import { Marker, Circle } from 'react-google-maps'

import { PeopleContext } from 'contexts'

import GoogleMap from 'components/GoogleMap'

import BonfireIcon from 'assets/bonfire.png'
import SkullIcon from 'assets/skull.png'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Panel = styled.section`
  width: 40rem;
`

const MapContainer = styled.section`
  height: 100%;
  width: 100%;
`

const parseLonLat = (lonlat) => {
  const start = lonlat.indexOf('(') + 1
  const end = lonlat.indexOf(')')

  const values = lonlat.slice(start, end).split(' ')

  return {
    lng: Number(values[0]),
    lat: Number(values[1]),
  }
}

export default class DashboardPage extends Component {
  render() {
    const { match: { params: { survivorId }} } = this.props

    return (
      <PeopleContext.Consumer>
        {({people, healthy, infected}) => (
          <Container>
            <Panel>
              <h1>{survivorId}'s Dashboard</h1>
            </Panel>
            <MapContainer>
              <GoogleMap>
                {healthy.map(idx => people[idx].lonlat && <Marker key={idx} icon={BonfireIcon} position={parseLonLat(people[idx].lonlat)} />)}
                {infected.map(idx => people[idx].lonlat && (
                  <React.Fragment key={idx}>
                    <Circle center={parseLonLat(people[idx].lonlat)} options={{fillColor: '#ff0000', fillOpacity: 0.3, strokeWeight: 0}} radius={1000} />
                    <Marker icon={SkullIcon} position={parseLonLat(people[idx].lonlat)} />
                  </React.Fragment>
                ))}
              </GoogleMap>
            </MapContainer>
          </Container>
        )}
      </PeopleContext.Consumer>
    )
  }
}
