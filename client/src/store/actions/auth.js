import axios from 'axios'
import { URL } from '../../utils/constants'
import { loginAC } from '../reducers/userReducer'
import myfetch from '../../utils/myfetch'

export const registration = (username, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signup', {
                username,
                password
            })
            alert(res.data.message)
            return true
        } catch (e) {
            console.log(e.response.data)
            return false
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signin', {
                username,
                password
            })
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                dispatch(loginAC(res.data.user))
                myfetch.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                return true
            } else {
                throw new Error('Ошибка входа в аккаунт')
            }
        } catch (e) {
            console.log(e.response.message)
            return false
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(URL + '/auth/me', { headers: { Authorization: `Bearer ${token}` } })
            dispatch(loginAC(res.data.user))
            myfetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log(res.data)
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.response)
        }
    }
}