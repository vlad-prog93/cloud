import './FileItem.css'
import dirSvg from '../../img/dir.svg'
import fileSvg from '../../img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir, setStackDir } from '../../store/reducers/fileReducer'
import { deleteFile, downloadFile, getFiles } from '../../store/actions/files'
import deleteSvg from '../../img/icons/delete.svg'
import downloadSvg from '../../img/icons/download.svg'
import calculationByte from '../../utils/calculationByte'

const FileItem = ({ file }) => {
  const isGrid = useSelector(state => state.files.isGrid)
  const dispatch = useDispatch()


  const handleClick = (e) => {
    dispatch(setCurrentDir(file._id))
    dispatch(setStackDir(file._id))
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

  const handleDrag = (file) => {
    console.log(file)
  }

  if (isGrid) {
    return (
      <div className='file'
        onDrag={file.type === "dir" ? null : () => handleDrag(file)}
        onClick={file.type === "dir" ? () => handleClick() : null}>
        <div className="file__text file__name">
          {file.type === 'dir' ?
            <img src={dirSvg} alt='Папка' className='file__img_dir' />
            :
            <img src={fileSvg} alt='Файл' className='file__img_file' />}
          {<p>{file.name}</p>}
        </div>
        {file.type !== "dir" && <p className="file__download" onClick={(e) => handleDownload(e)}>
          <img src={downloadSvg} alt='download' /></p>}
        <p className="file__delete" onClick={(e) => handleDelete(e)}>
          <img src={deleteSvg} alt='delete' />
        </p>
        <p className="file__date">{file.date.slice(0, 10)}</p>
        {file.type !== "dir" && <p className="file__size">{calculationByte(file.size)}</p>}
      </div>
    )
  }

  return (
    <div className='file-grid'
      onClick={file.type === "dir" ? () => handleClick() : null}>
      <div className="file__text_grid file__name">
        {file.type === 'dir' ?
          <img src={dirSvg} alt='Папка' className='file__img_dir' />
          :
          <img src={fileSvg} alt='Файл' className='file__img_file' />}
        {<p>{file.name}</p>}
      </div>
      <div className='file-grid__info'>
        <p className="file__delete  file__delete_grid" onClick={(e) => handleDelete(e)}>
          <img src={deleteSvg} alt='delete' /></p>
        {file.type !== "dir" && <p className="file__download" onClick={(e) => handleDownload(e)}>
          <img src={downloadSvg} alt='download' /></p>}
        {file.type !== "dir" && <p className="file__size file__size_grid">{calculationByte(file.size)}</p>}
      </div>

    </div>
  )
}


export default FileItem