import logo from '../../img/MyCloud.png'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAC } from '../../store/reducers/userReducer'
import { useEffect, useState } from 'react'
import { searchFiles } from '../../store/actions/files'
import { useDebounce } from '../../hooks/useDebounce'

const NavBar = () => {
  const [search, setSearch] = useState('')
  const { isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const activeClassName = "nav__link nav__link_active";
  const debounceValue = useDebounce(search, 500)

  useEffect(()=> {
    console.log('debounceValue:  ',debounceValue)
    dispatch(searchFiles(debounceValue))
  }, [debounceValue, dispatch])

  return (
    <div className="navbar">
      <div className='container'>
        <img src={logo} alt="logo" className="navbar__logo" />
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              {isAuth &&
                <input className='nav__search' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Поиск...'/>
              }
            </li>
            <li className="nav__item">
              {!isAuth &&
                <NavLink to='/signin' className={({ isActive }) => isActive ? activeClassName : 'nav__link'}>
                  Войти
                </NavLink>
              }
            </li>
            <li className="nav__item">
              {!isAuth &&
                <NavLink to='/signup' className={({ isActive }) => isActive ? activeClassName : 'nav__link'}>
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