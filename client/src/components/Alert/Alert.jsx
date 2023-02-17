import { useSelector } from 'react-redux'
import './Alert.css'

export const Alert = ({ name }) => {
    const error = useSelector(state => state.error.error)
    const classProgress = error ? 'alert__progress' : 'alert__progress alert__progress_success'
    return (
        <div className='alert'>
            <div className='alert__container'>
                <div className={classProgress}></div>
                <p className="alert__text">{name}</p>
                <div className={classProgress}></div>
            </div>
        </div>
    )
}