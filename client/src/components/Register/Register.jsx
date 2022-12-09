import './Register.css'

const Register = () => { 


  return (
    <div className="register">
      <div className="register__container">
          <form className="form">
            <h2 className="form__title">Регистрация</h2>
            <input type="text" className="form__input" placeholder="Введите имя" />
            <input type="password" className="form__input" placeholder="Введите пароль" />
            <button className="form__button">Войти</button>
          </form>
      </div>
    </div>
  )
}


export default Register