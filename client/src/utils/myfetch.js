import axios from 'axios'
import { URL } from './constants'

const myfetch = axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export default myfetch