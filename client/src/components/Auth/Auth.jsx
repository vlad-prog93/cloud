import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './Auth.css'
import { registration, login } from '../../store/actions/auth'

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = location.pathname === '/signin' ? true : false

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      const isLoginOk = dispatch(login(username, password))
      isLoginOk && navigate('/')
    } else {
      const isRegOk = dispatch(registration(username, password))
      isRegOk && navigate('/signin')
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <h2 className="form__title">{isLogin ? "Вход" : "Регистрация"}</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form__input" placeholder="Введите имя" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form__input" placeholder="Введите пароль" />
          <div className='form__line' />
          <div className='form__bottom'>
            {isLogin
              ? <>
              <NavLink to='/signin' className='form__bottom-link'>Забыли пароль? </NavLink>
              <button onClick={(e) => handleSubmit(e)} type="button" className="form__button" >Войти</button>
              </>
              : <>
              <NavLink to='/signin' className='form__bottom-link'>Уже есть аккаунт? </NavLink>
              <button onClick={(e) => handleSubmit(e)} type="button" className="form__button" >Создать</button>
              </>}
          </div>
        </form>
      </div>
    </div>
  )
}


export default Auth