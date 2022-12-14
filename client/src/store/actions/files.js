import axios from "axios"
import { URL } from "../../utils/constants"
import {getFilesAC} from '../reducers/fileReducer'
export const getFiles = (dir) => {
  return async dispatch => {
    try {
      const res = await axios.get(URL + `/files${dir?'?parent='+dir: ''}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(getFilesAC(res.data))

    } catch (e) {
      console.log(e)
    }
    
  }
}