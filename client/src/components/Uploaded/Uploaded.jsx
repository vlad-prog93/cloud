import { useDispatch } from 'react-redux'
import UploadedFile from '../UploadedFile/UploadedFile'
import './Uploaded.css'
import { closeUploaded } from '../../store/reducers/uploadedReducer'

const Uploaded = ({files}) => { 
  const dispatch = useDispatch()

  return (
    <div className="uploaded">
      <button className='uploaded__button' onClick={() => dispatch(closeUploaded())}>X</button>
      {files.map(file => <UploadedFile key={file.id} file={file}/>)}
    </div>
  )
}


export default Uploaded