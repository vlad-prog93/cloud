const GET_FILES = 'GET_FILES'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const CREATE_DIR = 'CREATE_DIR'
const SET_CURRENT_DIR ='SET_CURRENT_DIR'
const SET_STACK_DIR = 'SET_STACK_DIR'
const BACK_STACK_DIR = 'BACK_STACK_DIR'
const UPLOAD_FILES = 'UPLOAD_FILES'
const DELETE_FILE = 'DELETE_FILE'
const SEARCH_FILES = 'SEARCH_FILES'
const CHANGE_DISPLAY = 'CHANGE_DISPLAY'
const FILE_LOADING = 'FILE_LOADING'
const FILE_LOADED = 'FILE_LOADED' 

const initialState = {
  files: [],
  currentDir: null,
  stackDir: [],
  visibleModal: false,
  isGrid: false,
  isLoading: false
}

const fileReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_FILES: return {...state, files: [...action.payload]}
    case OPEN_MODAL: return {...state, visibleModal: true}
    case CLOSE_MODAL: return {...state, visibleModal: false}
    case CREATE_DIR: return {...state, files: [...state.files, action.payload]}
    case SET_CURRENT_DIR: return {...state, currentDir: action.payload}
    case SET_STACK_DIR: return {...state, stackDir: [...state.stackDir, action.payload]}
    case BACK_STACK_DIR: return {...state, stackDir: [...state.stackDir].slice(0, -1)}
    case UPLOAD_FILES: return {...state, files: [...state.files, action.payload]}
    case DELETE_FILE: return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
    case SEARCH_FILES: return {...state, files: [...action.payload]}
    case CHANGE_DISPLAY: return {...state, isGrid: !state.isGrid}
    case FILE_LOADING: return {...state, isLoading: true}
    case FILE_LOADED: return {...state, isLoading: false}
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

export const backStackDir = () => {
  return {type: BACK_STACK_DIR}
}

export const setStackDir = (fileDir) => {
  return {type: SET_STACK_DIR, payload: fileDir}
}

export const uploadFilesAC = (file) => {
  return {type: UPLOAD_FILES, payload: file}
}

export const deleteFileAC = (id) => {
  return {type: DELETE_FILE, payload: id}
}

export const searchFileAC = (files) => {
  return {type: SEARCH_FILES, payload: files}
}

export const changeDisplay = () => {
  return {type: CHANGE_DISPLAY}
}

export const fileLoading = () => {
  return {type: FILE_LOADING}
}

export const fileLoaded = () => {
  return {type: FILE_LOADED}
}

export default fileReducer