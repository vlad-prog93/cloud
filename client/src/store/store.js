import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import fileReducer from './reducers/fileReducer'
import uploadedReducer from './reducers/uploadedReducer'
import alertReducer from './reducers/alertReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    uploaded: uploadedReducer,
    error: alertReducer,
  }
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store