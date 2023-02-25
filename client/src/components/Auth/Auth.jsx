import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Auth.css'
import { registration, login } from '../../store/actions/auth'
import { useValidation } from '../../hooks/useValidation'

const Auth = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLogin = location.pathname === '/signin' ? true : false

  const [username, setUsername, usernameErrors] = useValidation('', { 'max-width': 10, 'min-width': 4, })
  const [password, setPassword, passwordErrors] = useValidation('', { 'max-width': 10, 'min-width': 4, })
  const [isBlur, setIsBlur] = useState({ username: false, password: false })
  const disabled = usernameErrors['min-width']?.isError
    || usernameErrors['max-width']?.isError
    || passwordErrors['min-width']?.isError
    || passwordErrors['max-width']?.isError


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      dispatch(login(username, password, navigate))
    } else {
      dispatch(registration(username, password, navigate))
    }
    setUsername('')
    setPassword('')
    setIsBlur({ username: false, password: false })
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <h2 className="form__title">{isLogin ? "Вход" : "Регистрация"}</h2>
          <input onBlur={() => setIsBlur({ ...isBlur, username: true })}
            value={username} onChange={e => setUsername(e.target.value)} type="text"
            className="form__input" placeholder="Введите имя" />
          {isBlur.username && <span className='auth__error'>
            {usernameErrors['min-width']?.isError && usernameErrors['min-width'].nameError}</span>}
          {isBlur.username && <span className='auth__error'>
            {usernameErrors['max-width']?.isError && usernameErrors['max-width'].nameError}</span>}
          <input onBlur={() => setIsBlur({ ...isBlur, password: true })} value={password}
            onChange={e => setPassword(e.target.value)} type="password"
            className="form__input" placeholder="Введите пароль" />
          {isBlur.password && <span className='auth__error'>
            {passwordErrors['min-width']?.isError && passwordErrors['min-width'].nameError}</span>}
          {isBlur.password && <span className='auth__error'>
            {passwordErrors['max-width']?.isError && passwordErrors['max-width'].nameError}</span>}
          <div className='form__line' />
          <div className='form__bottom'>
            {isLogin
              ? <>
                <NavLink to='/signin' className='form__bottom-link'>Забыли пароль? </NavLink>
                <button onClick={(e) => handleSubmit(e)} type="button" className="form__button" >Войти</button>
              </>
              : <>
                <NavLink to='/signin' className='form__bottom-link'>Уже есть аккаунт? </NavLink>
                <button disabled={disabled} onClick={(e) => handleSubmit(e)}
                  type="button" className="form__button">Создать</button>
              </>}
          </div>
        </form>
      </div>
    </div>
  )
}


export default Auth