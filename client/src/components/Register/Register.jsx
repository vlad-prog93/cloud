import { useState } from 'react'
import {useSelector} from 'react-redux'
import './Register.css'
import { registration } from '../../store/actions/auth'

const Register = () => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    registration(username, password)

  }

  return (
    <div className="register">
      <div className="register__container">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <h2 className="form__title">Регистрация</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form__input" placeholder="Введите имя" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form__input" placeholder="Введите пароль" />
            <button className="form__button">Зарегистрироваться</button>
          </form>
      </div>
    </div>
  )
}


export default Register