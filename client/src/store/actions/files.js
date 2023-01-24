import axios from "axios"
import { URL } from "../../utils/constants"
import { getFilesAC, creacteDirAC, closeModalAC, setCurrentDir, uploadFilesAC, deleteFileAC } from '../reducers/fileReducer'


export const getFiles = (dir = null) => {
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

export const creacteDir = (name, dir) => {
  return async dispatch => {
    try {
      const res = await axios.post(URL + `/files`,{
        type: "dir",
        name,
        parent: dir
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      dispatch(creacteDirAC(res.data.file))
      dispatch(closeModalAC())
    } catch (e) {
      console.log(e)
    }
  }
}

export const uploadFiles = (file, dir) => {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dir) {
        formData.append('parent', dir)
      }
      const res = await axios.post(URL + `/files/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(uploadFilesAC(res.data.file))
    } catch (e) {
      console.log(e)
    }
  }
}


export const downloadFile = (file) => {
  return async dispatch => {
    try {
      const res = await axios.get(URL + `/files/download`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        params: {id: file._id},
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteFile = (file) => {
  return async dispatch => {
    try {
      const res = await axios.delete(URL + `/files`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        params: {id: file._id}
      })
      dispatch(deleteFileAC(res.data.file._id))
    } catch (e) {
      console.log(e)
    }
  }
}