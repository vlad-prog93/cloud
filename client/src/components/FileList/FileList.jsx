import { useSelector } from 'react-redux'
import FileItem from '../FileItem/FileItem'
import './FileList.css'

const FileList = ({files}) => {
  const isGrid = useSelector(state => state.files.isGrid)
  return (
    <div className={!isGrid ? 'file__list' : 'file__list-grid'}>
      {files.files.length === 0 ? <h2 className='file__list-title'>Нет добавленных папок или файлов</h2> 
      : files.files.map(file => <FileItem key={file.name} file={file}/>)}
    </div>
  )
}


export default FileList