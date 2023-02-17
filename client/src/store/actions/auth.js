import axios from 'axios'
import { URL } from '../../utils/constants'
import { loginAC } from '../reducers/userReducer'
import myfetch from '../../utils/myfetch'
import { hideAlert, showAlert } from '../reducers/alertReducer'
import { Error } from '../../utils/errors'

export const registration = (username, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signup', {
                username,
                password
            })
            dispatch(showAlert(res.data.message))
        } catch (e) {
            Error(e, dispatch)
        } finally {
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
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
                dispatch(showAlert(res.data.message))
            } else {
                throw new Error('Ошибка входа в аккаунт')
            }
        } catch (e) {
            Error(e, dispatch)
        } finally {
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
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