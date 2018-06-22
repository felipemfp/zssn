const ITEMS_KEY = {
  water: 'Water',
  food: 'Food',
  medication: 'Medication',
  ammunition: 'Ammunition'
}

export const toString = (items) => {
  return Object.keys(items).map(key => ITEMS_KEY[key] && `${ITEMS_KEY[key]}:${items[key]}`).join(';')
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
