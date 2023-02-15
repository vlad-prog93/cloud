import { useSelector } from 'react-redux'
import FileItem from '../FileItem/FileItem'
import './FileList.css'

const FileList = ({files}) => {
  const isGrid = useSelector(state => state.files.isGrid)
  return (
    <div className={!isGrid && 'file__list'}>
      {files.files.map(file => <FileItem key={file.name} file={file}/>)}
    </div>
  )
}


export default FileList