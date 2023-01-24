const GET_FILES = 'GET_FILES'
const SET_FILE = 'SET_FILE'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const CREATE_DIR = 'CREATE_DIR'
const SET_CURRENT_DIR ='SET_CURRENT_DIR'
const BACK_CURRENT_DIR = 'BACK_CURRENT_DIR'
const UPLOAD_FILES = 'UPLOAD_FILES'
const DELETE_FILE = 'DELETE_FILE'

const initialState = {
  files: [],
  currentDir: [],
  visibleModal: false
}

const fileReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_FILES: return {...state, files: action.payload}
    case OPEN_MODAL: return {...state, visibleModal: true}
    case CLOSE_MODAL: return {...state, visibleModal: false}
    case CREATE_DIR: return {...state, files: [...state.files, action.payload]}
    case SET_CURRENT_DIR: return {...state, currentDir: [...state.currentDir, action.payload]}
    case BACK_CURRENT_DIR: return {...state, currentDir: [...state.currentDir].slice(0, -1)}
    case UPLOAD_FILES: return {...state, files: [...state.files, action.payload]}
    case DELETE_FILE: return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
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

export const setCurrentDir = (fileDir) => {
  return {type: SET_CURRENT_DIR, payload: fileDir}
}

export const backCurrentDir = () => {
  return {type: BACK_CURRENT_DIR}
}

export const uploadFilesAC = (file) => {
  return {type: UPLOAD_FILES, payload: file}
}

export const deleteFileAC = (id) => {
  return {type: DELETE_FILE, payload: id}
}

export default fileReducer