import React from 'react'
import { Header } from 'semantic-ui-react'
import { Marker, Circle, InfoWindow } from 'react-google-maps'
import BonfireIcon from 'assets/bonfire.png'
import SkullIcon from 'assets/skull.png'

const PersonMarker = ({person, position, onToggle, infected=false, infoWindowOpen=false}) => {
  return (
    <React.Fragment>
      {infected && <Circle center={position} options={{fillColor: '#ff0000', fillOpacity: 0.3, strokeWeight: 0}} radius={1000} />}
      <Marker
        icon={infected ? SkullIcon : BonfireIcon}
        position={position}
        onClick={onToggle}
      >
        {infoWindowOpen && <InfoWindow onCloseClick={onToggle}>
          <Header
            content={infected ? `(Infected) ${person.name}` : person.name}
            subheader={`${person.age} years old`}
          />
        </InfoWindow>}
      </Marker>
    </React.Fragment>
  )
}

export default PersonMarker
