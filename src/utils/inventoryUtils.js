const ITEMS_KEY = {
  water: 'Water',
  food: 'Food',
  medication: 'Medication',
  ammunition: 'Ammunition'
}

const ITEMS_POINT = {
  water: 4,
  food: 3,
  medication: 2,
  ammunition: 1
}

export const calculatePoints = (items) => {
  return  Object.keys(items).reduce((sum, key) => sum + (items[key] * ITEMS_POINT[key]), 0)
}

export const toString = (items, ignoreZeros=false) => {
  return Object.keys(items)
    .filter(key => ITEMS_KEY[key] && (ignoreZeros ? items[key] > 0 : true))
    .map(key => `${ITEMS_KEY[key]}:${items[key]}`)
    .join(';')
}

export const fromString = (items) => {
    return items.split(';').reduce((result, item) => {
      const [key, value] = item.split(':')
      if (ITEMS_KEY[key.toLowerCase()]) {
        result[key.toLowerCase()] += Number(value)
      }
      return result
    }, {
      water: 0,
      food: 0,
      medication: 0,
      ammunition: 0
    })
}

export const parseProperties = (properties) => properties.reduce((items, property) => {
  items[property.item.name.toLowerCase()] = property.quantity
  return items
}, {
  water: 0,
  food: 0,
  medication: 0,
  ammunition: 0
})
