import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Disk from './components/Disk/Disk'
import Auth from './components/Auth/Auth'
import Admin from './components/Admin/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/actions/auth'
import Modal from './components/Modal/Modal'
import { Alert } from './components/Alert/Alert'
import Loader from './components/Loader/Loader'

function App() {
  const { isAuth, isFetching, isAdmin } = useSelector(state => state.user)
  const errorName = useSelector(state => state.error.name)
  const alert = useSelector(state => state.error.isVisible)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  if (isFetching) {
    return (
      <div className="App">
        <div className='wrapper-loader'>
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className='wrapper'>
            <NavBar />
            {isAdmin ?
              <Routes>
                <Route path='/admin' element={<Admin />} />
                <Route path='*' element={<Navigate to='/admin' />} />
              </Routes> :
              <>
                {!isAuth
                  ?
                  <Routes>
                    <Route path='/signup' element={<Auth />} />
                    <Route path='/signin' element={<Auth />} />
                    <Route path='*' element={<Navigate to='/signin' />} />
                  </Routes>
                  :
                  <Routes>
                    <Route path='/' element={<Disk />} />

                    <Route path='*' element={<Navigate to='/' />} />
                  </Routes>
                }
              </>
            }
          </div>
        </div>
      </BrowserRouter>
      {alert && <Alert name={errorName} />}
      <Modal />
    </>
  );
}

export default App;
