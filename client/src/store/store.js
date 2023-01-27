import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import fileReducer from './reducers/fileReducer'
import uploadedReducer from './reducers/uploadedReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    uploaded: uploadedReducer,
  }
})

export default store