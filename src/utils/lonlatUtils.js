export const toString = ({lat, lng}) => `POINT (${lng} ${lat})`

export const fromString = (latLngString) => {
  const start = latLngString.indexOf('(') + 1
  const end = latLngString.indexOf(')')

  const values = latLngString.slice(start, end).split(' ')

  return {
    lng: Number(values[0]),
    lat: Number(values[1]),
  }
}
