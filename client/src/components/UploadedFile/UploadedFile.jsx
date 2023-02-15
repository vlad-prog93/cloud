import { useDispatch } from 'react-redux'
import './UploadedFile.css'
import { removeUploadFile } from '../../store/reducers/uploadedReducer'

const UploadedFile = ({file}) => { 
  const dispatch = useDispatch()

  return (
    <div className="uploaded-file">
      <p className="uploaded-file__title">{file.name} 
      <button className='uploaded-file__button' onClick={() => dispatch(removeUploadFile(file))}>X</button>
      </p>
      <div className="uploaded-file__progress"><div className="uploaded-file__actual-prog" style={{width: file.progress+'%'}}></div><span>{file.progress + '%'}</span></div>
    </div>
  )
}


export default UploadedFile