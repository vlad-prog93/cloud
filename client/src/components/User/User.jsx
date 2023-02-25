import './User.css'
import deleteLogo from '../../img/icons/delete.svg'
import { useState } from 'react'


const User = ({user, handleDeleteUser, checked}) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleChecked = () => {
        setIsChecked(!isChecked)
        checked(user, !isChecked)
    }

    return (
        <div className="user">
            <ul className='user__list'>
                <label onClick={() => handleChecked()} className={isChecked ? 'user__label user__label_checked' : 'user__label'} htmlFor={user.username}></label>
                <input  id={user.username} type="checkbox" className="user__input" />
                <li className="user__item">{user.username}</li>
                <li className="user__item">{Math.round(user.usedSpace/(1024*1024))} Mб</li>
                <li className="user__item">{Math.round(user.diskSpace/1024**3)} Гб</li>
                <li className="user__item"><img src={deleteLogo} alt="Удалить" onClick={() => handleDeleteUser(user)}/></li>
            </ul>
        </div>

    )
} 

export default User