import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Disk from './components/Disk/Disk'
import Auth from './components/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/actions/auth'
import Modal from './components/Modal/Modal'

function App() {
  const { isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <div className='wrapper'>
            {!isAuth
              ?
              <Routes>
                <Route path='/signup' element={<Auth />} />
                <Route path='/signin' element={<Auth />} />
              </Routes>
              :
              <Routes>
                <Route path='/' element={<Disk />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            }
          </div>
        </div>
      </BrowserRouter>
      <Modal />
    </>
  );
}

export default App;
