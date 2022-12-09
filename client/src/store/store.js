import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import fileReducer from '../reducers/fileReducer'

export default store = configureStore({
  user: userReducer,
  files: fileReducer
})