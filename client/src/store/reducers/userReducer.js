const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'

const initialState = {
  user: {},
  isAuth: false,
  visibleAlert: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: return { ...state, user: action.payload, isAuth: true }
    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state, user: {}, isAuth: false
      }
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



export default userReducer