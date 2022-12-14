import axios from "axios"
import { URL } from "../../utils/constants"
import { getFilesAC, creacteDirAC, closeModalAC } from '../reducers/fileReducer'


export const getFiles = (dir) => {
  return async dispatch => {
    try {
      const res = await axios.get(URL + `/files${dir ? '?parent=' + dir : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      dispatch(getFilesAC(res.data))

    } catch (e) {
      console.log(e)
    }

  }
}

export const creacteDir = (name) => {
  return async dispatch => {
    try {
      const res = await axios.post(URL + `/files`,{
        type: "dir",
        name
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        
      })
      console.log(res.data)
      dispatch(creacteDirAC(res.data.file))
      dispatch(closeModalAC())
    } catch (e) {
      console.log(e)
    }
  }
}