import { getFilesAC, creacteDirAC, closeModalAC, uploadFilesAC, deleteFileAC, searchFileAC } from '../reducers/fileReducer'
import myfetch from "../../utils/myfetch"
import { addUploadFile, openUploaded, progressUploadFile } from '../reducers/uploadedReducer'


export const getFiles = (dir = null, sort) => {
  return async dispatch => {
    let url
    if (!dir) {
      url = `/files${'?sort=' + sort}`
    }
    if (dir && sort) {
      url = `/files${'?parent=' + dir}${'&sort=' + sort}`
    }
    try {
      const res = await myfetch.get(url)
      dispatch(getFilesAC(res.data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const creacteDir = (name, dir) => {
  return async dispatch => {
    try {
      const res = await myfetch.post('/files', {
        type: "dir",
        name,
        parent: dir
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
      const uploadedFile = {id: Date.now(), name: file.name, progress: 0}
      dispatch(openUploaded())
      dispatch(addUploadFile(uploadedFile))
      const res = await myfetch.post(`/files/upload`, formData, {
        onUploadProgress: progressEvent => {
          const progress = parseInt(Math.floor((progressEvent.loaded / progressEvent.total) * 100 ))
          uploadedFile.progress = progress
          dispatch(progressUploadFile(uploadedFile))
        }
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
      const res = await myfetch.get(`/files/download`, {
        params: { id: file._id },
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
      const res = await myfetch.delete(`/files`, {
        params: { id: file._id }
      })
      dispatch(deleteFileAC(res.data.file._id))
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchFiles = (search) => {
  return async dispatch => {
    let url = `/files/search${'?search=' + search}`

    try {
      const res = await myfetch.get(url)
      dispatch(searchFileAC(res.data))
    } catch (e) {
      console.log(e)
    }
  }
}
