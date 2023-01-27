const OPEN_UPLOADED = 'OPEN_UPLOADED'
const CLOSE_UPLOADED = 'CLOSE_UPLOADED'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE'
const UPLOADED_PROGRESS = 'UPLOADED_PROGRESS'

const initialState = {
  visible: false,
  files: []
}

const uploadedReducer = (state=initialState, action) => {
  switch (action.type) {
    case OPEN_UPLOADED: return {...state, visible: true}
    case CLOSE_UPLOADED: return {...state, visible: false}
    case ADD_UPLOAD_FILE: return {...state, files: [...state.files, action.payload]}
    case REMOVE_UPLOAD_FILE: return {...state, files: [...state.files].filter(file => file.id !== action.payload)}
    case UPLOADED_PROGRESS: return {...state, files: [...state.files].map(file => {
      if (file.id === action.payload.id) file.progress = action.payload.progress
      return file
    })}
    default:
      return state
  }
}

export const openUploaded = () => {
  return {type: OPEN_UPLOADED}
}

export const closeUploaded = () => {
  return {type: CLOSE_UPLOADED}
}

export const addUploadFile = (file) => {
  return {type: ADD_UPLOAD_FILE, payload: file}
}

export const removeUploadFile = (file) => {
  return {type: REMOVE_UPLOAD_FILE, payload: file.id}
}

export const progressUploadFile = (file) => {
  return {type: UPLOADED_PROGRESS, payload: file}
}

export default uploadedReducer