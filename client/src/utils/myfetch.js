import axios from 'axios'
import { URL } from './constants'

const myfetch = axios.create({
  baseURL: URL
})

export default myfetch