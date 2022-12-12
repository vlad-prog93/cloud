import {useDispatch} from 'react-redux'
import { useState } from 'react'
import './Login.css'
import { login } from '../../store/actions/auth'
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div className="register">
      <div className="register__container">
        <form onSubmit={e => handleSubmit(e)} className="form">
          <h2 className="form__title">Авторизация</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form__input" placeholder="Введите имя" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form__input" placeholder="Введите пароль" />
            <button className="form__button">Войти</button>
        </form>
      </div>
    </div>
  )
}


export default Login