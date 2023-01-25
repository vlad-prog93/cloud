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
  }

  const handleDownload = (e) => {
    e.preventDefault()
    dispatch(downloadFile(file))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteFile(file))
  }
  return (
    <div className='file' onClick={file.type === "dir" ? () => handleClick() : console.log(file.name) }>
      <p className="file__text file__name">
        <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="#" />
        {<p>{file.name}</p>}
      </p>
      {file.type !== "dir" && <p className="file__text file__download" onClick={(e) => handleDownload(e)}>Загрузить</p>}
      <p className="file__text file__delete" onClick={(e) => handleDelete(e)}>Удалить</p>
      <p className="file__text file__date">{file.date.slice(0,10)}</p>
      <p className="file__text file__size">{file.size}</p>
    </div>
  )
}


export default FileItem