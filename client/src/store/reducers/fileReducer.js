const GET_FILES = 'GET_FILES'
const SET_FILE = 'SET_FILE'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const CREATE_DIR = 'CREATE_DIR'

const initialState = {
  files: [],
  currentDir: null,
  visibleModal: false
}

const fileReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_FILES: return {...state, files: action.payload}
    case OPEN_MODAL: return {...state, visibleModal: true}
    case CLOSE_MODAL: return {...state, visibleModal: false}
    case CREATE_DIR: return {...state, files: [...state.files, action.payload]}
    default:
      return state
  }
}

export const getFilesAC = (files) => {
  return {type: GET_FILES, payload: files}
}

export const creacteDirAC = (file) => {
  return {type: CREATE_DIR, payload: file}
}

export const openModalAC = () => {
  return {type: OPEN_MODAL}
}

export const closeModalAC = () => {
  return {type: CLOSE_MODAL}
}

export default fileReducer