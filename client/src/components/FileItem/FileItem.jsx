import './FileItem.css'
import dirSvg from '../../img/dir.svg'
import fileSvg from '../../img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { backCurrentDir, setCurrentDir } from '../../store/reducers/fileReducer'
import { deleteFile, downloadFile, getFiles } from '../../store/actions/files'

const FileItem = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const files = useSelector(state => state.files)

  const handleClick = (e) => {
    dispatch(setCurrentDir(file._id))
    dispatch(getFiles(file._id))
    console.log('click')
  }

  const handleDownload = (e) => {
    e.preventDefault()
    dispatch(downloadFile(file))
    console.log('download')
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteFile(file))
    console.log('delete')
    console.log(files)
  }
  return (
    <div className='file' onClick={file.type === "dir" ? () => handleClick() : undefined }>
      <p className="file__text file__name">
        <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="#" />
        {file.name}
      </p>
      {file.type !== "dir" && <p className="file__text file__download" onClick={(e) => handleDownload(e)}>Загрузить</p>}
      <p className="file__text file__delete" onClick={(e) => handleDelete(e)}>Удалить</p>
      <p className="file__text file__date">{file.date.slice(0,10)}</p>
      <p className="file__text file__size">{file.size}</p>
    </div>
  )
}


export default FileItem