import { useEffect, useState } from "react"

export const useValidation = (value, options) => {

    const [valueValid, setValueValid] = useState(value)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        for (let key in options) {
            switch (key) {
                case 'max-width':
                    if (valueValid.length > options['max-width']) {
                        setErrors({ ...errors, 'max-width': { isError: true, nameError: `Не более ${options['min-width']} символов` } })
                    } else {
                        setErrors({ ...errors, 'max-width': { isError: false, nameError: '' } })
                    }
                case 'min-width':
                    if (valueValid.length < options['min-width']) {
                        setErrors({ ...errors, 'min-width': { isError: true, nameError: `Не менее ${options['min-width']} символов` } })
                    } else {
                        setErrors({ ...errors, 'min-width': { isError: false, nameError: '' } })
                    }
            }
        }
    }, [valueValid])


    return [valueValid, setValueValid, errors]

}