import { getFilesAC, creacteDirAC, closeModalAC, uploadFilesAC, deleteFileAC, searchFileAC, fileLoading, fileLoaded } from '../reducers/fileReducer'
import myfetch from "../../utils/myfetch"
import { addUploadFile, openUploaded, progressUploadFile } from '../reducers/uploadedReducer'
import { Error } from '../../utils/errors'
import { showAlert, hideAlert } from '../reducers/alertReducer'

export const getFiles = (dir = null, sort = 'name') => {
  return async dispatch => {
    let url

    if (!dir) {
      url = `/files${'?sort=' + sort}`
    }
    if (dir && sort) {
      url = `/files${'?parent=' + dir}${'&sort=' + sort}`
    }
    try {
      dispatch(fileLoading())
      const res = await myfetch.get(url)
      dispatch(getFilesAC(res.data))
    } catch (e) {
      alert('error')
      console.log(e)
    } finally {
      dispatch(fileLoaded())
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
      dispatch(showAlert('Папка успешно создана'))
    } catch (e) {
      Error(e, dispatch)
    } finally {
      setTimeout(() => {
        dispatch(hideAlert())
      }, 2000)
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
      let uploadedFile = { id: Math.random(), name: file.name, progress: 0 }

      const res = await myfetch.post(`/files/upload`, formData, {
        onUploadProgress: progressEvent => {
          const progress = parseInt(Math.floor((progressEvent.loaded / progressEvent.total) * 100))
          uploadedFile = { ...uploadedFile, progress: progress }
          dispatch(progressUploadFile(uploadedFile))
        }
      })
      dispatch(openUploaded())
      dispatch(addUploadFile(uploadedFile))
      dispatch(uploadFilesAC(res.data.file))
    } catch (e) {
      Error(e, dispatch)
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
      Error(e, dispatch)
    } finally {
      setTimeout(() => {
          dispatch(hideAlert())
      }, 2000)
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
      dispatch(showAlert('Удалено успешно'))
    } catch (e) {
      Error(e, dispatch)
    } finally {
      setTimeout(() => {
        dispatch(hideAlert())
      }, 2000)
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
