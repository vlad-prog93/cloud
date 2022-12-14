const GET_FILES = 'GET_FILES'
const SET_FILE = 'SET_FILE'

const initialState = {
  files: [],
  currentDir: null
}

const fileReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_FILES: return {...state, files: action.payload}
    default:
      return state
  }
}

export const getFilesAC = (files) => {
  return {type: GET_FILES, payload: files}
}

export default fileReducer