import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFiles} from '../../store/actions/files'
import FileItem from '../FileItem/FileItem'
import './FileList.css'

const FileList = () => {
  const dispatch = useDispatch()
  const files = useSelector(state => state.files)
  

  useEffect(() => {
    console.log(files)
    dispatch(getFiles(files.currentDir[files.currentDir.length-1]))
  }, [dispatch, files.currentDir])

  return (
    <div>
      {files.files.map(file => <FileItem key={file.name} file={file}/>)}
    </div>
  )
}


export default FileList