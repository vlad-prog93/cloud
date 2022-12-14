import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFiles} from '../../store/actions/files'
import FileItem from '../FileItem/FileItem'
import './FileList.css'

const FileList = () => {
  const dispatch = useDispatch()
  const files = useSelector(state => state.files.files)
  

  useEffect(() => {
    dispatch(getFiles())
  }, [])

  return (
    <div>
      {files.map(file => <FileItem key={file.name} file={file}/>)}
    </div>
  )
}


export default FileList