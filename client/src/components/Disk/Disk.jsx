import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileList from '../FileList/FileList'
import { openModalAC, backCurrentDir } from '../../store/reducers/fileReducer'
import './Disk.css'
import { getFiles, uploadFiles } from '../../store/actions/files'
import Uploaded from '../Uploaded/Uploaded'

const Disk = () => {
  const [isOnDrop, setIsOnDrop] = useState(false)
  const files = useSelector(state => state.files)
  const isVisibleUploaded = useSelector(state => state.uploaded.visible)
  const uploadedFiles = useSelector(state => state.uploaded.files)
  const dispatch = useDispatch()

  const back = () => {
    dispatch(backCurrentDir())
  }

  const handleUploadFile = (e) => {
    const sendfiles = [...e.target.files]
    sendfiles.forEach(file => {
      dispatch(uploadFiles(file, files.currentDir[files.currentDir.length - 1]))
    })
    e.target.value = ''
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOnDrop(true)
    console.log(isOnDrop)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOnDrop(false)
    console.log(isOnDrop)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const sendfiles = [...e.dataTransfer.files]
    sendfiles.forEach(file => dispatch(uploadFiles(file, files.currentDir[files.currentDir.length - 1])))
    setIsOnDrop(false)
    
  }

  useEffect(() => {
    dispatch(getFiles(files.currentDir[files.currentDir.length-1]))
  }, [dispatch, files.currentDir])

  return (
    <section className="disk" onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={handleDragEnter} onDragLeave={handleDragLeave}>
      {isOnDrop
        ? <div className='disk__drop'>Перетащите сюда файл</div>
        : <><div className='disk__tools'>
          <button type='button' className="disk__button" onClick={() => back()}>Назад</button>
          <button type='button' onClick={() => dispatch(openModalAC())} className="disk__button">Создать новую папку</button>
          <form className='disk__form'>
            <label className="disk__button" htmlFor='input__upload'>Загрузить файл</label>
            <input onChange={(e) => handleUploadFile(e)} multiple={true} type="file" id='input__upload' style={{ 'display': 'none' }} />
          </form>
        </div>
          <div className='disk__info'>
            <p className='disk__text disk__name'>Название</p>
            <p className='disk__text disk__date'>Дата</p>
            <p className='disk__text disk__size'>Размер</p>
          </div>
          <FileList files={files} />
          {isVisibleUploaded && <Uploaded files={uploadedFiles} />}
          </>
      }
    </section >

  )
}


export default Disk