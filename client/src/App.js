import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <div className='wrapper'>
          <Routes>
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
