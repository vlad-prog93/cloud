import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { creacteDir } from '../../store/actions/files'
import { closeModalAC } from '../../store/reducers/fileReducer'

import './Modal.css'

const Modal = () => { 
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const [dirName, setDirName] = useState('')
  const active = useSelector(state => state.files.visibleModal)
  const modalClass = active ? 'modal modal_active' : 'modal' 
  
  const handleCloseModal =(e) => {
    e.stopPropagation()
    dispatch(closeModalAC())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(creacteDir(dirName, currentDir))
  }

  return (
    <div onClick={(e) => handleCloseModal(e)} className={modalClass}>
      <div onClick={(e) => e.stopPropagation()}  className='modal__container'>
        <button onClick={() => dispatch(closeModalAC())} className='modal__button'>X</button>
        <h2 className="modal__title">Создание папки</h2>
        <form onSubmit={e => handleSubmit(e)} className="modal__form">
          <input className='modal__input'
          value={dirName} 
          onChange={e => setDirName(e.target.value)} 
          type="text" 
          placeholder='Введите название папки' />
          <button className='modal__button-form'>Создать</button>
        </form>
      </div>
    </div>
  )
}


export default Modal