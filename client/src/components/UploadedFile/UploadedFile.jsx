import { useDispatch } from 'react-redux'
import './UploadedFile.css'
import { removeUploadFile } from '../../store/reducers/uploadedReducer'

const UploadedFile = ({file}) => { 
  const dispatch = useDispatch()

  return (
    <div className="uploaded-file" onClick={() => dispatch(removeUploadFile(file))}>
      <p className="uploaded-file__title">{file.name} <button className='uploaded-file__button' onClick={() => console.log('close_2')}>X</button></p>
      <div className="uploaded-file__progress"><div className="uploaded-file__actual-prog" style={{width: file.progress+'%'}}></div><span>{file.progress + '%'}</span></div>
    </div>
  )
}


export default UploadedFile