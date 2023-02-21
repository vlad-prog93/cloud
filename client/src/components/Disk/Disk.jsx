import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileList from '../FileList/FileList'
import Loader from '../Loader/Loader'
import { openModalAC, backStackDir, setCurrentDir, changeDisplay } from '../../store/reducers/fileReducer'
import './Disk.css'
import { getFiles, uploadFiles } from '../../store/actions/files'
import Uploaded from '../Uploaded/Uploaded'
import rowVertical from '../../img/icons/row-vertical.svg'
import rowHorizontal from '../../img/icons/row-horizontal.svg'
import { getUser } from '../../store/actions/auth'

const Disk = () => {
  const [isOnDrop, setIsOnDrop] = useState(false)
  const [sort, setSort] = useState('name')

  const isGrid = useSelector(state => state.files.isGrid)
  const isLoading = useSelector(state => state.files.isLoading)
  const files = useSelector(state => state.files)
  const isVisibleUploaded = useSelector(state => state.uploaded.visible)
  const uploadedFiles = useSelector(state => state.uploaded.files)
  const user = useSelector(state => state.user.user)

  const dispatch = useDispatch()

  const back = () => {
    const dir = files.stackDir[files.stackDir.length - 2]
    dispatch(backStackDir())
    dispatch(setCurrentDir(dir))
  }

  const handleUploadFile = (e) => {
    const sendfiles = [...e.target.files]
    sendfiles.forEach(file => {
      dispatch(uploadFiles(file, files.currentDir))
    })
    e.target.value = ''
    dispatch(getUser())
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOnDrop(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOnDrop(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const sendfiles = [...e.dataTransfer.files]
    sendfiles.forEach(file => dispatch(uploadFiles(file, files.currentDir)))
    setIsOnDrop(false)
  }

  useEffect(() => {
    dispatch(getFiles(files.currentDir, sort))
    dispatch(getUser())
    console.log('dfds')
  }, [dispatch, files.currentDir, sort, files.files.length])

  return (
    <section className="disk"
      onDrop={e => handleDrop(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragOver={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}>
      {isOnDrop
        ? <div className='disk__drop'>Перетащите сюда файл</div>
        : <>
          <div className='disk__tools'>
            <button
              type='button'
              className="disk__button disk__button_back"
              onClick={() => back()}
              disabled={files.currentDir ? false : true}>Назад</button>
            <input type='button' onClick={() => dispatch(openModalAC())} className="disk__button" value='Создать папку' />
            <form className='disk__form'>
              <label className="disk__button" htmlFor='input__upload'>Загрузить файл</label>
              <input onChange={(e) => handleUploadFile(e)} multiple={true} type="file" id='input__upload' style={{ 'display': 'none' }} />
            </form>
            <select className='disk__select' value={sort} onChange={(e) => setSort(e.target.value)} name="sort" id="sort">
              <option value="name">По названию</option>
              <option value="date">По дате</option>
              <option value="size">По размеру</option>
              <option value="type">По типу</option>
            </select>
            <button className='disk__button' onClick={() => dispatch(changeDisplay())}>
              <img src={isGrid ? rowVertical : rowHorizontal} alt='Вид'/>
              </button>
            <p className='disk__disk-space'>Память - {Math.round(user.usedSpace/(1024*1024))} Mб/{Math.round(user.diskSpace/1024**3)} Гб</p>
          </div>
          {isGrid
            ? <>
              <div className='disk__info'>
                <p className='disk__text disk__name'>Название</p>
                <p className='disk__text disk__date'>Дата</p>
                <p className='disk__text disk__size'>Размер</p>
              </div>
              {isLoading ? <div className='disk__loader'><Loader /></div> : <FileList files={files} />}
            </>
            : isLoading ? <div className='disk__loader'><Loader /></div> : <FileList files={files} />
          }


          {isVisibleUploaded && <Uploaded files={uploadedFiles} />}
        </>
      }
    </section >

  )
}


export default Disk