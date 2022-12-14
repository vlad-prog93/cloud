import { useDispatch } from 'react-redux'
import FileList from '../FileList/FileList'
import { openModalAC } from '../../store/reducers/fileReducer'
import './Disk.css'

const Disk = () => { 
  const dispatch = useDispatch()

  return (
    <section className="disk">
      <button className="disk__button">Назад</button>
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