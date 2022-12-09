import logo from '../../img/logo.svg'
import {NavLink} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
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
            <NavLink to='/signin' className='nav__link'>
              Войти
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to='/signup' className='nav__link'>
              Регистрация
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  )
}


export default NavBar