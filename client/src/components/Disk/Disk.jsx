import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileList from '../FileList/FileList'
import { openModalAC, backCurrentDir } from '../../store/reducers/fileReducer'
import './Disk.css'
import { getFiles, uploadFiles } from '../../store/actions/files'

const Disk = () => {
  const [isOnDrop, setIsOnDrop] = React.useState(false)
  const dispatch = useDispatch()
  const files = useSelector(state => state.files)


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
          <FileList /></>
      }
    </section >

  )
}


export default Disk