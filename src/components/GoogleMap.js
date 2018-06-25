import React from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps'

import { GOOGLE_MAPS_API_KEY, INITIAL_LAT_LNG } from 'utils/constants'

import mapStyles from 'mapStyles.json'

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={props.defaultZoom || 8}
      defaultCenter={props.defaultCenter || INITIAL_LAT_LNG()}
      defaultOptions={{styles: mapStyles}}
      {...props}
    >
      {props.children}
    </GoogleMap>
  )
})
