import axios from "axios"
import { URL } from "../../utils/constants"
import { deleteUserAC, usersFetchingAC, usersFetchingSuccessAC } from "../reducers/adminReducer"
import { hideAlert, showAlert } from "../reducers/alertReducer"

export const usersFetching = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                dispatch(usersFetchingAC)
                const res = await axios.get(URL + '/auth/users', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                dispatch(usersFetchingSuccessAC(res.data))
            } catch(e) {
                Error(e, dispatch)
            } finally {
                setTimeout(() => {
                    dispatch(hideAlert())
                }, 3000)
            }
        }
    }
}

export const deleteUser = (username) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.delete(URL + `/auth/users/${username}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            dispatch(deleteUserAC(username))
            dispatch(showAlert(res.data.message))
        } catch(e) {
            Error(e, dispatch)
        } finally {
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
        }
    }
}