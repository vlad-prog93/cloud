import axios from 'axios'
import {URL} from '../../utils/constants'
import { loginAC } from '../reducers/userReducer'

export const registration = async (username, password) => {
    try {
        const res = await axios.post(URL + '/auth/signup', {
            username,
            password
        })
        alert(res.data.message)
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signin', {
                username,
                password
            })
            localStorage.setItem('token', res.data.token)
            dispatch(loginAC(res.data.user))
            console.log(res.data)
        } catch (e) {
            console.log(e.response.message)
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        try {
            const res = await axios.get(URL + '/auth/me', {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(loginAC(res.data.user))
            console.log(res.data)
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.response)
        }
    }
}