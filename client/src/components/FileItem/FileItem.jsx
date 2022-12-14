import './FileItem.css'
import dirSvg from '../../img/dir.svg'
import fileSvg from '../../img/file.svg'

const FileItem = ({ file }) => {

  return (
    <div className='file'>
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