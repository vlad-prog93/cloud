import {useEffect, useState} from 'react'

export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState(value)

    useEffect(()=> {

        const handler = setTimeout(()=> {
            setValueDebounce(value)
        }, delay)

        return ()=> {
            clearTimeout(handler)
        }

    }, [valueDebounce, delay, value])
    
    return valueDebounce
}