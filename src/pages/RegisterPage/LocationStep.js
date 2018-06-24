import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

import * as lonlatUtils from 'utils/lonlatUtils'
import { NATAL_LAT_LNG } from 'utils/constants'
import GoogleMap from 'components/GoogleMap'

export default class LocationStep extends Component {
  handleDragEnd = ({latLng}) => {
    const { onLocationChange } = this.props

    const lat = latLng.lat()
    const lng = latLng.lng()

    onLocationChange(lonlatUtils.toString({lat, lng}))
  }

  render() {
    const { location } = this.props
    const defaultZoom = location ? 15 : 10
    const position = location
      ? lonlatUtils.fromString(this.props.location)
      : NATAL_LAT_LNG

    return (
      <div style={{height: '300px'}}>
        <GoogleMap defaultCenter={position} defaultZoom={defaultZoom}>
          <Marker defaultPosition={position} draggable={true} onDragEnd={this.handleDragEnd}>
            <InfoWindow>
              <span>Drag to update current location</span>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </div>
    )
  }
}
