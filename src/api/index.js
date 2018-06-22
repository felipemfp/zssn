import axios from 'axios'
import { API_URL } from 'utils/constants'

export const getPeople = () => axios.get(`${API_URL}/api/people.json`)

export const getPerson = (personId) => axios.get(`${API_URL}/api/people/${personId}.json`)

export const getPersonProperties = (personId) => axios.get(`${API_URL}/api/people/${personId}/properties.json`)

export const postPerson = ({name, age, lonlat, items, gender}) => {
  const person = {name, age, lonlat, gender}

  return axios.post(`${API_URL}/api/people.json`, {person, items})
}


export const patchPerson = (personId, {name, age, lonlat, gender}) => {
  const person = {name, age, lonlat, gender}

  return axios.patch(`${API_URL}/api/people/${personId}.json`, {person})
}
