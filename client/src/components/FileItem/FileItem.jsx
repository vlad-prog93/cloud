import './FileItem.css'
import dirSvg from '../../img/dir.svg'
import fileSvg from '../../img/file.svg'
import { useDispatch } from 'react-redux'
import {  setCurrentDir } from '../../store/reducers/fileReducer'
import { deleteFile, downloadFile, getFiles } from '../../store/actions/files'
import deleteSvg from '../../img/icons/delete.svg'
import downloadSvg from '../../img/icons/download.svg'
import calculationByte from '../../utils/calculationByte'

const FileItem = ({ file }) => {
  const dispatch = useDispatch()


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
    <div className='file' onClick={file.type === "dir" ? () => handleClick() : null }>
      <p className="file__text file__name">
        <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="#" />
        {<p>{file.name}</p>}
      </p>
      {file.type !== "dir" && <p className="file__text file__download" onClick={(e) => handleDownload(e)}><img src={downloadSvg} /></p>}
      <p className="file__text file__delete" onClick={(e) => handleDelete(e)}><img src={deleteSvg} /></p>
      <p className="file__text file__date">{file.date.slice(0,10)}</p>
      {file.type !== "dir" && <p className="file__text file__size">{calculationByte(file.size)}</p>}
    </div>
  )
}


export default FileItem