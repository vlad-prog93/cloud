import './FileItem.css'
import dirSvg from '../../img/dir.svg'
import fileSvg from '../../img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir } from '../../store/reducers/fileReducer'
import { getFiles } from '../../store/actions/files'

const FileItem = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  const handleClick = (e) => {
    dispatch(setCurrentDir(file._id))
    dispatch(getFiles(file._id))
  }

  return (
    <div className='file' onClick={file.type === "dir" ? () => handleClick() : () => console.log('file') }>
      <p className="file__text file__name">
        <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="#" />
        {file.name}
      </p>
      <p className="file__text file__date">{file.date.slice(0,10)}</p>
      <p className="file__text file__size">{file.size}</p>
    </div>
  )
}


export default FileItem