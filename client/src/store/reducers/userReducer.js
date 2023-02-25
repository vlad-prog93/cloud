const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const SET_ADMIN = 'SET_ADMIN'
const USER_FETCHING = 'USER_FETCHING'
const USER_FETCHING_SUCCESS = 'USER_FETCHING_SUCCESS'


const initialState = {
  user: {},
  isAuth: false,
  visibleAlert: false,
  isAdmin: false,
  isFetching: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: return { ...state, user: action.payload, isAuth: true }
    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state, user: {}, isAuth: false, isAdmin: false
      }
    case SET_ADMIN: return { ...state, isAdmin: true }
    case USER_FETCHING: return { ...state, isFetching: true }
    case USER_FETCHING_SUCCESS: return { ...state, isFetching: false }
    default:
      return state
  }
}

export const loginAC = (user) => {
  return { type: SET_USER, payload: user }
}

export const logoutAC = () => {
  return { type: LOG_OUT }
}

export const setAdminAC = () => {
  return { type: SET_ADMIN }
}

export const userFetching = () => {
  return { type: USER_FETCHING }
}

export const userFetchingSuccess = () => {
  return { type: USER_FETCHING_SUCCESS }
}


export default userReducer