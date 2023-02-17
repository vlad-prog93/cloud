const SHOW_ERROR = 'SHOW_ERROR'
const HIDE_ERROR = 'HIDE_ERROR'
const SHOW_ALERT = 'SHOW_ALERT'
const HIDE_ALERT = 'HIDE_ALERT'


const initialState = {
    error: false,
    name: '',
    status: null,
    isVisible: false,
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR: return { ...state, isVisible: true, error: true, name: action.payload }
        case SHOW_ALERT: return { ...state, isVisible: true, name: action.payload }
        case HIDE_ALERT: return { ...state, isVisible: false, error: false, name: '' }

        default: return state
    }
}

export const showError = (nameError) => {
    return { type: SHOW_ERROR, payload: nameError }
}

export const hideError = () => {
    return { type: HIDE_ERROR }
}

export const showAlert = (name) => {
    return { type: SHOW_ALERT, payload: name }
}

export const hideAlert = () => {
    return { type: HIDE_ALERT }
}

export default alertReducer
