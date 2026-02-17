import { useState } from "react"

export const useFrom = (initialValue, validateForm, callback) => {

    // estado principal, manejo de inputs
    const [form, setForm] = useState(initialValue)

    // Estado de errores
    const [errors, setErrors] = useState(initialValue)

    // Estado de interaccion real con los inputs
    const [touched, setTouched] = useState(initialValue)

    //metodo que atrapa lo que el usuari escribe en el input, detecta lo cambios (input controlado)
    const onInputChange = ({ target }) => {
        const { name, value } = target

        setForm({
            ...form,
            [name]: value
        })

        // validamos que el usuario haya echo touched y que no haya escrito nada para mostrar errores antes del submit
        if (touched[name]) {
            setErrors({
                ...errors,
                [name]: validateForm(name, value) || ""
            })
        }
    }

    // onSubmit para evitar el envio del formulario y agrego de validaciones al hacer submit (no pueden intentar enviarse un formulario vacio)
    const onSubmit = (event) => {
        event.preventDefault()

        const newErrors = validateForm(form)

        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some(errors => errors !== "")
        if (hasErrors) return

        // limpiamos el input para su proximo uso
        callback(form)
    }

    // onBlur para indica que el usuario interactuo con el componente y luego salio de este
    const handlerOnBlur = ({ target }) => {
        const { name, value } = target

        setTouched({
            ...touched,
            [name]: true
        })

        setErrors({
            ...errors,
            [name]: validateForm(name, value) || ""
        })
    }

    return {
        form,
        errors,
        touched,
        onInputChange,
        onSubmit,
        handlerOnBlur
    }
}