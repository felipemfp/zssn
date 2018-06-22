import React, { Component } from 'react'
import { Marker } from 'react-google-maps'

import * as lonlatUtils from 'utils/lonlatUtils'
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
    let defaultZoom = 10
    let position = {
      lat: -5.779257,
      lng: -35.200916
    }

    if (location) {
      defaultZoom = 17
      position = lonlatUtils.fromString(this.props.location)
    }

    return (
      <div style={{height: '300px'}}>
        <GoogleMap defaultCenter={position} defaultZoom={defaultZoom}>
          <Marker defaultPosition={position} draggable={true} onDragEnd={this.handleDragEnd} />
        </GoogleMap>
      </div>
    )
  }
}
