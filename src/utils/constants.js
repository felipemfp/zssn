let initialLatLng = {
  lat: -5.779257,
  lng: -35.200916
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    initialLatLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  })
}

export const API_URL = process.env.REACT_APP_API_URL
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
export const INITIAL_LAT_LNG = () => initialLatLng
