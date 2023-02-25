import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import { deleteUser, usersFetching } from '../../store/actions/admin'
import Loader from '../Loader/Loader'
import './Admin.css'
import { addStackDeleteUser, removeStackDeleteUser } from '../../store/reducers/adminReducer'

const Admin = () => {
    const dispatch = useDispatch()
    const {users, isFetching, stackDeleteUsers} = useSelector(state => state.admin)

    const handleDeleteUser = (user) => {
        dispatch(deleteUser(user.username))
    }

    const handleDeleteUsers = (usersname) => {
        usersname.forEach(username => {
            dispatch(deleteUser(username))
            dispatch(removeStackDeleteUser(username))
        });
    }
    

    const handleChecked = (user, isChecked) => {
        if (isChecked) {
            dispatch(addStackDeleteUser(user.username))
        } else {
            dispatch(removeStackDeleteUser(user.username))
        }
    }

    useEffect(() => {
        dispatch(usersFetching())
    }, [users.length, dispatch])

    if (isFetching) {
        return <Loader />
    } 

    return (
        <div className='admin'>
            <button onClick={() => handleDeleteUsers(stackDeleteUsers)}  className="disk__button">Удалить выделенные</button>
            <ul className="admin__list">
                <li className="admin__item">Выбрать</li>
                <li className="admin__item">Имя пользователя</li>
                <li className="admin__item">Использовано памяти</li>
                <li className="admin__item">Всего памяти</li>
                <li className="admin__item">Удалить</li>
            </ul>
            {users.map(user => <User key={user._id} user={user} checked={handleChecked} handleDeleteUser={handleDeleteUser} />)}
        </div>
    )
}

export default Admin