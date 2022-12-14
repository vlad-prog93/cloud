import FileList from '../FileList/FileList'
import './Disk.css'

const Disk = () => { 


  return (
    <section className="disk">
      <button className="disk__button">Назад</button>
      <button className="disk__button">Создать новую папку</button>
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