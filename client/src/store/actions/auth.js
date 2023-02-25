import axios from 'axios'
import { URL } from '../../utils/constants'
import { loginAC, setAdminAC, userFetching, userFetchingSuccess } from '../reducers/userReducer'
import myfetch from '../../utils/myfetch'
import { hideAlert, showAlert } from '../reducers/alertReducer'
import { Error } from '../../utils/errors'

export const registration = (username, password, navigate) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signup', {
                username,
                password
            })
            dispatch(showAlert(res.data.message))
            navigate('/signin')
        } catch (e) {
            Error(e, dispatch)
        } finally {
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
        }
    }
}

export const login = (username, password, navigate) => {
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/auth/signin', {
                username,
                password
            })
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                dispatch(loginAC(res.data.user))
                if (res.data.user?.roles?.includes('ADMIN')) {
                    dispatch(setAdminAC())
                }
                myfetch.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                dispatch(showAlert(res.data.message))
                navigate('/')
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
        const token = localStorage.getItem('token')
        if (token) {
            try {
                dispatch(userFetching())
                const res = await axios.get(URL + '/auth/me', { headers: { Authorization: `Bearer ${token}` } })
                dispatch(loginAC(res.data.user))
                if (res.data.user?.roles?.includes('ADMIN')) {
                    dispatch(setAdminAC())
                }
                myfetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
            } catch (e) {
                localStorage.removeItem('token')
                console.log(e.response)
            } finally {
                dispatch(userFetchingSuccess())
            }
        }
    }
}