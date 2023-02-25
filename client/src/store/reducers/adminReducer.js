const USERS_FETCHING = 'USERS_FETCHING'
const USERS_FETCHING_SUCCESS = 'USERS_FETCHING_SUCCESS'
const USER_DELETE = 'USER_DELETE'
const ADD_STACK_DELETE_USER = 'ADD_STACK_DELETE_USER'
const REMOVE_STACK_DELETE_USER = 'REMOVE_STACK_DELETE_USER'


const initialState = {
    users: [],
    stackDeleteUsers: [],
    isFetching: false
}

const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case USERS_FETCHING: return {...state, isFetching: true}
        case USERS_FETCHING_SUCCESS: return {...state, users: [...action.payload], isFetching: false}
        case USER_DELETE: return {...state, users: state.users.filter(user => user.username !== action.payload)}
        case ADD_STACK_DELETE_USER: return {...state, stackDeleteUsers: [...state.stackDeleteUsers, action.payload]}
        case REMOVE_STACK_DELETE_USER: return {...state, stackDeleteUsers: [...state.stackDeleteUsers.filter(username => username !== action.payload)]}
        default: return state
    }
}

export const usersFetchingAC = () => {
    return {type: USERS_FETCHING}
}

export const usersFetchingSuccessAC = (users) => {
    return {type: USERS_FETCHING_SUCCESS, payload: users}
}

export const deleteUserAC = (username) => {
    return {type: USER_DELETE, payload: username}
}

export const addStackDeleteUser = (username) => {
    return {type: ADD_STACK_DELETE_USER, payload: username}
}

export const removeStackDeleteUser = (username) => {
    return {type: REMOVE_STACK_DELETE_USER, payload: username}
}

export default adminReducer