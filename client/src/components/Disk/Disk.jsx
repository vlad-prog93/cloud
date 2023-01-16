import { useDispatch, useSelector } from 'react-redux'
import FileList from '../FileList/FileList'
import { openModalAC, backCurrentDir } from '../../store/reducers/fileReducer'
import './Disk.css'
import { getFiles } from '../../store/actions/files'

const Disk = () => { 
  const dispatch = useDispatch()
  const files = useSelector(state => state.files)
  const back = () => {
    dispatch(backCurrentDir())
  }

  return (
    <section className="disk">
      <button className="disk__button" onClick={() => back()}>Назад</button>
      <button type='button' onClick={() => dispatch(openModalAC())} className="disk__button">Создать новую папку</button>
      <div className='disk__info'>
        <p className='disk__text disk__name'>Название</p>
        <p className='disk__text disk__date'>Дата</p>
        <p className='disk__text disk__size'>Размер</p>
      </div>
      <FileList />
    </section >
  )
}


export default Disk