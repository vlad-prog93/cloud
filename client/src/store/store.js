import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import fileReducer from './reducers/fileReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer
  }
})

export default store