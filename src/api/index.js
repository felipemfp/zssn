import axios from 'axios'
import { API_URL } from 'utils/constants'

export const getPeople = () => axios.get(`${API_URL}/api/people.json`)
