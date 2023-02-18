import { hideAlert, showError } from '../store/reducers/alertReducer'

export const Error = (e, dispatch) => {
    if (e.response) {
        e.response.data.errors ? dispatch(showError('Неправильные логин или пароль'))
        : dispatch(showError(e.response.data.message))
    } else if (e.request) {
        dispatch(showError('Ошибка сети'))
    } else {
        dispatch(showError('Что-то пошло не так'))
    }
    setTimeout(() => {
        dispatch(hideAlert())
    }, 3000)
}