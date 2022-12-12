import logo from '../../img/logo.svg'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAC } from '../../store/reducers/userReducer'

const NavBar = () => {
  const { isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <div className="navbar">
      <div className='container'>
        <img src={logo} alt="logo" className="navbar__logo" />
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to='/' className='nav__link'>
                MERN CLOUD
              </NavLink>
            </li>
            <li className="nav__item">
              {!isAuth &&
                <NavLink to='/signin' className='nav__link'>
                  Войти
                </NavLink>
              }
            </li>
            <li className="nav__item">
              {!isAuth &&
                <NavLink to='/signup' className='nav__link'>
                  Регистрация
                </NavLink>
              }
            </li>
            <li className="nav__item">
              {isAuth &&
                <button onClick={() => dispatch(logoutAC())} className='nav__link'>
                  Выйти
                </button>
              }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}


export default NavBar