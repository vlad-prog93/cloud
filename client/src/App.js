import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/actions/auth';

function App() {
  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <div className='wrapper'>
          {!isAuth && 
          <Routes>
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login />} />
          </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
