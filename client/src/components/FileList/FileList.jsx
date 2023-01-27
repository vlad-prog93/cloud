import FileItem from '../FileItem/FileItem'
import './FileList.css'

const FileList = ({files}) => {

  return (
    <div>
      {files.files.map(file => <FileItem key={file.name} file={file}/>)}
    </div>
  )
}


export default FileList